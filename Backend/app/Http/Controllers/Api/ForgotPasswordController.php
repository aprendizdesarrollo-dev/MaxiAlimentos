<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    /**
     * Envía un enlace de restablecimiento de contraseña al correo institucional del usuario.
     */
    public function sendResetLink(Request $request)
    {
        // ✅ 1. Validar el correo institucional
        $request->validate([
            'correo' => 'required|email|exists:users,correo',
        ], [
            'correo.exists' => 'No existe un usuario con ese correo institucional.',
        ]);

        // ✅ 2. Buscar al usuario
        $user = User::where('correo', $request->correo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado.',
            ], 404);
        }

        // ✅ 3. Generar token aleatorio
        $token = Str::random(64);

        // ✅ 4. Guardar o actualizar el token en la tabla password_reset_tokens
        try {
            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $user->correo], // 👈 debe ser 'email'
                [
                    'token' => $token,
                    'created_at' => Carbon::now(),
                ]
            );
        } catch (\Throwable $e) {
            Log::error("Error guardando token: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error guardando el token de restablecimiento.',
                'error' => $e->getMessage(),
            ], 500);
        }

        // ✅ 5. Crear el enlace de recuperación que abre el frontend
        $resetLink = "http://localhost:5173/reset-password/{$token}?email={$user->correo}";

        // ✅ 6. Enviar el correo
        try {
            Mail::raw(
                "Hola {$user->nombre},\n\n" .
                "Has solicitado restablecer tu contraseña.\n\n" .
                "Haz clic en el siguiente enlace para continuar:\n{$resetLink}\n\n" .
                "Si no realizaste esta solicitud, ignora este mensaje.\n\n" .
                "Atentamente,\nEl equipo de MaxiAlimentos S.A.S.",
                function ($message) use ($user) {
                    $message->to($user->correo)
                            ->subject('Restablecer contraseña - MaxiAlimentos');
                }
            );

            return response()->json([
                'success' => true,
                'message' => 'Enlace de restablecimiento enviado correctamente. Revisa tu correo corporativo.',
            ]);
        } catch (\Throwable $e) {
            Log::error("Error SMTP: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar el correo. Verifica la configuración SMTP en el archivo .env',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
