<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessagesController extends Controller
{
    /**
     * Lista las conversaciones del usuario autenticado,
     * para mostrar en la carta del dashboard de mensajes.
     */
    public function index(Request $request)
    {
        $authUser = $request->user();

        // Conversaciones donde participa el usuario autenticado
        $conversations = Conversation::with(['user1', 'user2'])
            ->where('user1_id', $authUser->id)
            ->orWhere('user2_id', $authUser->id)
            ->orderByDesc('last_message_at')
            ->get()
            ->map(function (Conversation $conversation) use ($authUser) {
                $otherUser = $conversation->otherUser($authUser->id);

                // Determinar cuántos no leídos tiene este usuario
                $unreadCount = $conversation->user1_id === $authUser->id
                    ? $conversation->unread_count_user1
                    : $conversation->unread_count_user2;

                return [
                    'id' => $conversation->id,
                    'other_user' => [
                        'id' => $otherUser->id,
                        'nombre' => $otherUser->nombre ?? $otherUser->name,
                        'correo' => $otherUser->email,
                        // Puedes agregar aquí foto_perfil si tu modelo User lo tiene
                        'foto_perfil' => $otherUser->foto_perfil ?? null,
                    ],
                    'last_message' => $conversation->last_message,
                    'last_message_at' => $conversation->last_message_at,
                    'unread_count' => $unreadCount,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $conversations,
        ]);
    }

    /**
     * Devuelve el historial de mensajes entre el usuario autenticado
     * y otro usuario específico (usado cuando entras desde el Directorio
     * o desde la lista de conversaciones).
     */
    public function chat(Request $request, $otherUserId)
    {
        $authUser = $request->user();

        // Validar que el otro usuario exista
        $otherUser = User::findOrFail($otherUserId);

        // Buscar o crear conversación
        $conversation = $this->findOrCreateConversation($authUser->id, $otherUser->id);

        // Traer mensajes de la conversación
        $messages = Message::with(['remitente', 'destinatario'])
            ->where('conversation_id', $conversation->id)
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function (Message $message) use ($authUser) {
                return [
                    'id' => $message->id,
                    'remitente_id' => $message->remitente_id,
                    'destinatario_id' => $message->destinatario_id,
                    'mensaje' => $message->mensaje,
                    'leido' => $message->leido,
                    'read_at' => $message->read_at,
                    'created_at' => $message->created_at,
                    'es_mio' => $message->remitente_id === $authUser->id,
                ];
            });

        // Marcar los mensajes dirigidos al usuario autenticado como leídos
        $this->markAsReadForConversation($conversation, $authUser->id);

        return response()->json([
            'success' => true,
            'data' => [
                'conversation_id' => $conversation->id,
                'other_user' => [
                    'id' => $otherUser->id,
                    'nombre' => $otherUser->nombre ?? $otherUser->name,
                    'correo' => $otherUser->email,
                    'foto_perfil' => $otherUser->foto_perfil ?? null,
                ],
                'messages' => $messages,
            ],
        ]);
    }

    /**
     * Enviar un mensaje a otro usuario.
     *
     * Request:
     *  - destinatario_id
     *  - mensaje
     */
    public function store(Request $request)
    {
        $authUser = $request->user();

        $data = $request->validate([
            'destinatario_id' => 'required|exists:users,id',
            'mensaje' => 'required|string|max:5000',
        ]);

        // Evitar auto-mensajes
        if ((int) $data['destinatario_id'] === $authUser->id) {
            return response()->json([
                'success' => false,
                'message' => 'No puedes enviarte mensajes a ti mismo.',
            ], 422);
        }

        $destinatario = User::findOrFail($data['destinatario_id']);

        // Transacción
        $message = DB::transaction(function () use ($authUser, $destinatario, $data) {

            // Buscar/crear conversación
            $conversation = $this->findOrCreateConversation($authUser->id, $destinatario->id);

            // Crear mensaje
            $message = Message::create([
                'conversation_id' => $conversation->id,
                'remitente_id' => $authUser->id,
                'destinatario_id' => $destinatario->id,
                'mensaje' => $data['mensaje'],
                'leido' => false,
            ]);

            // Actualizar resumen de la conversación
            $conversation->last_message = $data['mensaje'];
            $conversation->last_message_at = now();

            // Actualizar contador de no leídos
            if ($conversation->user1_id === $destinatario->id) {
                $conversation->unread_count_user1++;
            } else {
                $conversation->unread_count_user2++;
            }

            $conversation->save();

            return $message;
        });

        return response()->json([
            'success' => true,
            'message' => 'Mensaje enviado correctamente.',
            'data' => [
                'id' => $message->id,
                'conversation_id' => $message->conversation_id,
                'mensaje' => $message->mensaje,
                'created_at' => $message->created_at,
            ],
        ], 201);
    }


    /**
     * Marca todos los mensajes de una conversación como leídos
     * para el usuario autenticado.
     *
     * Se puede llamar desde el frontend cuando abras un chat.
     */
    public function markAsRead(Request $request, $otherUserId)
    {
        $authUser = $request->user();

        $otherUser = User::findOrFail($otherUserId);

        $conversation = $this->findConversation($authUser->id, $otherUser->id);

        if (!$conversation) {
            return response()->json([
                'success' => true,
                'message' => 'No hay conversación que marcar como leída.',
            ]);
        }

        $this->markAsReadForConversation($conversation, $authUser->id);

        return response()->json([
            'success' => true,
            'message' => 'Mensajes marcados como leídos.',
        ]);
    }

    /**
     * Devuelve el total de mensajes no leídos del usuario autenticado,
     * para usarlo en la campana de notificaciones o en el módulo de mensajes.
     */
    public function unreadCount(Request $request)
    {
        $authUser = $request->user();

        // Puedes hacerlo sumando los campos de conversations
        $conversations = Conversation::where(function ($query) use ($authUser) {
            $query->where('user1_id', $authUser->id)
                ->orWhere('user2_id', $authUser->id);
        })
            ->get();

        $total = 0;

        foreach ($conversations as $conversation) {
            if ($conversation->user1_id === $authUser->id) {
                $total += $conversation->unread_count_user1;
            } else {
                $total += $conversation->unread_count_user2;
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'total_unread' => $total,
            ],
        ]);
    }

    /**
     * Busca una conversación entre 2 usuarios.
     * Retorna null si no existe.
     */
    protected function findConversation(int $userId1, int $userId2): ?Conversation
    {
        // Ordenar siempre los ids para mantener la consistencia
        $ids = [$userId1, $userId2];
        sort($ids);

        return Conversation::where('user1_id', $ids[0])
            ->where('user2_id', $ids[1])
            ->first();
    }

    /**
     * Busca una conversación entre 2 usuarios o la crea en caso de no existir.
     */
    protected function findOrCreateConversation(int $userId1, int $userId2): Conversation
    {
        $conversation = $this->findConversation($userId1, $userId2);

        if ($conversation) {
            return $conversation;
        }

        // Ordenar ids para que siempre user1_id < user2_id
        $ids = [$userId1, $userId2];
        sort($ids);

        return Conversation::create([
            'user1_id' => $ids[0],
            'user2_id' => $ids[1],
            'last_message' => null,
            'last_message_at' => null,
            'unread_count_user1' => 0,
            'unread_count_user2' => 0,
        ]);
    }

    /**
     * Marca como leídos los mensajes de una conversación
     * dirigidos al usuario autenticado y resetea el contador
     * de no leídos en la tabla conversations.
     */
    protected function markAsReadForConversation(Conversation $conversation, int $authUserId): void
    {
        // Actualizar los mensajes
        Message::where('conversation_id', $conversation->id)
            ->where('destinatario_id', $authUserId)
            ->where('leido', false)
            ->update([
                'leido' => true,
                'read_at' => now(),
            ]);

        // Actualizar contadores de no leídos
        if ($conversation->user1_id === $authUserId) {
            $conversation->unread_count_user1 = 0;
        } else {
            $conversation->unread_count_user2 = 0;
        }

        $conversation->save();
    }
}
