<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * ✅ Actualiza los datos del perfil del usuario autenticado.
     * Ruta: PUT /api/user/update
     */
    public function update(Request $request)
    {
        try {
            // 🔐 Autenticamos al usuario usando el token JWT
            $user = JWTAuth::parseToken()->authenticate();

            // 🧩 Validar los campos requeridos
            $validator = Validator::make($request->all(), [
                'cedula' => 'required|string|max:20',
                'cargo'  => 'required|string|max:100',
                'area'   => 'required|string|max:100',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Datos inválidos',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // 🧱 Actualizar los datos del usuario
            $user->update([
                'cedula' => $request->input('cedula'),
                'cargo'  => $request->input('cargo'),
                'area'   => $request->input('area'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Perfil actualizado correctamente',
                'user' => $user,
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token expirado, inicia sesión nuevamente.',
            ], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido.',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el perfil: ' . $e->getMessage(),
            ], 500);
        }
    }
}
