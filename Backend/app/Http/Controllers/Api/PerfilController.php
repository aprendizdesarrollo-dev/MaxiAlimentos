<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class PerfilController extends Controller
{
    /**
     * 📄 Mostrar información del usuario autenticado
     */
    public function show()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            // Agregar la URL completa de la foto si existe
            if ($user->foto_perfil) {
                $user->foto_perfil = asset('storage/' . $user->foto_perfil);
            }

            return response()->json([
                'success' => true,
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la información del perfil.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /*Actualizar datos del perfil */
    public function update(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $validator = Validator::make(
                $request->all(),
                [
                    'nombre' => 'required|string|max:255',
                    'segundo_nombre' => 'nullable|string|max:255',
                    'apellido' => 'required|string|max:255',

                    'genero' => 'nullable|string|max:50',
                    'fecha_nacimiento' => 'nullable|date',
                    'estado_civil' => 'nullable|string|max:100',

                    'cedula' => 'nullable|string|max:30|unique:users,cedula,' . $user->id,
                    'telefono_personal' => 'nullable|string|max:30',
                    'correo_personal' => 'nullable|email|max:255',
                    'correo_corporativo' => 'nullable|email|max:255',

                    'direccion' => 'nullable|string|max:255',
                    'ciudad' => 'nullable|string|max:100',
                    'departamento' => 'nullable|string|max:100',
                    'pais' => 'nullable|string|max:100',

                    'cargo' => 'nullable|string|max:150',
                    'area' => 'nullable|string|max:150',
                    'jefe_directo' => 'nullable|string|max:255'
                ],

                [
                    'nombre.required' => 'El nombre es obligatorio.',
                    'apellido.required' => 'El apellido es obligatorio.',

                    'cedula.unique' => 'La cédula ingresada ya está registrada en el sistema.',
                    'cedula.max' => 'La cédula no puede superar los 30 caracteres.',

                    'correo_personal.email' => 'El correo personal no tiene un formato válido.',
                    'correo_corporativo.email' => 'El correo corporativo no tiene un formato válido.',

                    'fecha_nacimiento.date' => 'Debe ingresar una fecha de nacimiento válida.',

                    'genero.string' => 'El género ingresado es inválido.',
                    'estado_civil.string' => 'El estado civil ingresado es inválido.',

                    'telefono_personal.max' => 'El teléfono personal no puede superar los 30 caracteres.',

                    'cargo.string' => 'El cargo ingresado no es válido.',
                    'area.string' => 'El área ingresada no es válida.',
                    'jefe_directo.string' => 'El nombre del jefe directo no es válido.',
                ]
            );

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $user->update($validator->validated());

            // REFRESCAR TOKEN PARA QUE NO SE PIERDA LA SESIÓN
            $token = JWTAuth::refresh(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Perfil actualizado correctamente.',
                'data' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el perfil.',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * 🖼️ Actualizar foto de perfil
     */
    public function updateFoto(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            $validator = Validator::make($request->all(), [
                'foto_perfil' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
            }

            // Borrar anterior
            if ($user->foto_perfil && Storage::disk('public')->exists($user->foto_perfil)) {
                Storage::disk('public')->delete($user->foto_perfil);
            }

            // Guardar nueva
            $path = $request->file('foto_perfil')->store('users', 'public');

            $user->foto_perfil = $path;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Foto de perfil actualizada correctamente.',
                'foto_url' => asset('storage/' . $path)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al subir la foto.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function actualizarFoto(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($request->hasFile('foto_perfil')) {
                $file = $request->file('foto_perfil');
                $path = $file->store('fotos_perfil', 'public');

                $user->foto_perfil = $path;
                $user->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Foto actualizada correctamente',
                    'foto_perfil' => asset('storage/' . $path),
                ]);
            }

            return response()->json(['success' => false, 'message' => 'No se envió ninguna imagen.'], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la foto de perfil.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
