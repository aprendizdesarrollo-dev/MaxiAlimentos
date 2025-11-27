<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comunicado;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;
use App\Helpers\NotificacionHelper;

class ComunicadosController extends Controller
{
    /**
     * 📄 Listar todos los comunicados
     */
    public function index()
    {
        try {
            $comunicados = Comunicado::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $comunicados
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'descripcion' => 'Error al obtener los comunicados',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ➕ Crear un nuevo comunicado
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'titulo' => 'required|string|max:255',
                'descripcion' => 'required|string',
            ]);

            // Obtener usuario autenticado (para autor)
            $user = auth()->user();

            // Crear comunicado con fecha actual
            $comunicado = \App\Models\Comunicado::create([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                'autor' => $user ? $user->nombre : 'Administrador General',
                'fecha' => now()->format('Y-m-d'),
            ]);

            NotificacionHelper::enviar(
                'Nuevo comunicado',
                $comunicado->titulo,
                'comunicado',
                $comunicado->id
            );


            return response()->json([
                'success' => true,
                'descripcion' => 'Comunicado creado correctamente',
                'data' => $comunicado
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'descripcion' => 'Error al crear el comunicado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * ✏️ Actualizar comunicado
     */
    public function update(Request $request, $id)
    {
        try {
            $comunicado = Comunicado::findOrFail($id);

            $request->validate([
                'titulo' => 'required|string|max:255',
                'descripcion' => 'required|string',
            ]);

            $comunicado->update([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Comunicado actualizado correctamente',
                'data' => $comunicado
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el comunicado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 🗑️ Eliminar comunicado
     */
    public function destroy($id)
    {
        try {
            $comunicado = Comunicado::findOrFail($id);
            $comunicado->delete();

            return response()->json([
                'success' => true,
                'message' => 'Comunicado eliminado correctamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar el comunicado',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
