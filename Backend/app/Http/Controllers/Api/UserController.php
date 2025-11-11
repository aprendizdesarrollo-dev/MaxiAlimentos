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
            // Autenticar usuario con token JWT
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró el usuario autenticado.',
                ], 404);
            }

            //  Validar los datos enviados (todos opcionales salvo nombre)
            $validator = Validator::make($request->all(), [
                'nombre' => 'nullable|string|max:100',
                'cargo'  => 'nullable|string|max:100',
                'area'   => 'nullable|string|max:100',
                'foto'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Datos inválidos.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            // Si se envía una nueva foto, la guardamos
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $nombreArchivo = time() . '_' . $foto->getClientOriginalName();
                $ruta = $foto->storeAs('fotos_perfil', $nombreArchivo, 'public');

                // Eliminar foto anterior si existe
                if ($user->foto && file_exists(storage_path('app/public/' . $user->foto))) {
                    unlink(storage_path('app/public/' . $user->foto));
                }

                // Actualizamos el campo foto en el usuario
                $user->foto = $ruta;
            }

            //  Actualizar demás campos (solo los que se envíen)
            $user->fill(array_filter([
                'nombre' => $request->input('nombre'),
                'cargo'  => $request->input('cargo'),
                'area'   => $request->input('area'),
            ]));

            $user->save();

            //  Devolver la URL completa de la imagen
            $user->foto_url = $user->foto
                ? asset('storage/' . $user->foto)
                : null;

            return response()->json([
                'success' => true,
                'message' => 'Perfil actualizado correctamente.',
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