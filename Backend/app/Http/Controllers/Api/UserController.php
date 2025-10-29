<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Actualiza los datos del perfil del usuario autenticado.
     * Ruta: PUT /api/user/update
     */
    public function update(Request $request)
    {
        // 1️⃣ Verificar si hay un usuario autenticado
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Sesión expirada o token inválido'
            ], 401);
        }

        // 2️⃣ Validar los campos del formulario
        $validator = Validator::make($request->all(), [
            'cedula' => 'required|string|max:20',
            'cargo' => 'required|string|max:50',
            'area' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Datos inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        // 3️⃣ Actualizar la información
        $user->cedula = $request->cedula;
        $user->cargo = $request->cargo;
        $user->area = $request->area;
        $user->save();

        // 4️⃣ Responder con éxito
        return response()->json([
            'success' => true,
            'message' => 'Perfil actualizado correctamente',
            'user' => $user
        ]);
    }
}
