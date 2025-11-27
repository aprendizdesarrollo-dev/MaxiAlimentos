<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use PHPMailer\PHPMailer\Exception;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use Illuminate\Support\Str;
use PHPMailer\PHPMailer\PHPMailer;


class AuthController extends Controller
{
    /**
     * Registro de usuario (solo crea cuenta)
     */
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'nombre'            => 'required|string|max:255',
                'apellido'          => 'required|string|max:255',
                'correo'            => 'required|string|email|max:255|unique:users,correo',
                'password'          => 'required|string|min:6|confirmed',
                'cedula'            => 'required|string|max:20|unique:users,cedula',
                'cargo'             => 'nullable|string|max:100',
                'area'              => 'nullable|string|max:100',
                'segundo_nombre'    => 'nullable|string|max:255',
                'genero'            => 'nullable|string|max:50',
                'fecha_nacimiento'  => 'nullable|date',
                'estado_civil'      => 'nullable|string|max:100',
                'telefono_personal' => 'nullable|string|max:50',
                'correo_corporativo' => 'nullable|string|email|max:255',
                'correo_personal'   => 'nullable|string|email|max:255',
                'direccion'         => 'nullable|string|max:255',
                'ciudad'            => 'nullable|string|max:100',
                'departamento'      => 'nullable|string|max:100',
                'pais'              => 'nullable|string|max:100',
                'jefe_directo'      => 'nullable|string|max:255',
                'rol'               => 'nullable|string|max:50',
            ]);

            // Generar código de verificación (numérico)
            $code = rand(100000, 999999);

            // Guardar los datos temporalmente en caché (15 minutos)
            Cache::put('verify_' . $validated['correo'], [
                'nombre' => $validated['nombre'],
                'segundo_nombre' => $request->segundo_nombre,
                'apellido' => $validated['apellido'],
                'genero' => $request->genero,
                'fecha_nacimiento' => $request->fecha_nacimiento,
                'estado_civil' => $request->estado_civil,
                'telefono_personal' => $request->telefono_personal,
                'correo' => $validated['correo'],
                'correo_corporativo' => $request->correo_corporativo,
                'correo_personal' => $request->correo_personal,
                'direccion' => $request->direccion,
                'ciudad' => $request->ciudad,
                'departamento' => $request->departamento,
                'pais' => $request->pais,
                'cedula' => $validated['cedula'],
                'cargo' => $request->cargo,
                'area' => $request->area,
                'jefe_directo' => $request->jefe_directo,
                'rol' => $request->rol ?? 'Empleado',
                'password' => Hash::make($validated['password']),
                'code' => $code,
            ], now()->addMinutes(15));

            // Enviar correo con el código
            Mail::to($validated['correo'])->send(new VerificationCodeMail($code, $validated['nombre']));

            // Respuesta JSON
            return response()->json([
                'success' => true,
                'message' => 'Se envió un código de verificación al correo institucional. Tienes 15 minutos para verificarlo.'
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error en el registro: ' . $ex->getMessage()
            ], 500);
        }
    }


    /**
     * Login (genera token JWT)
     */
    public function login(Request $request)
    {
        auth()->shouldUse('api');

        $credentials = $request->only('correo', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales inválidas.'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Inicio de sesión exitoso.',
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => auth()->user(),
        ]);
    }


    /**
     * Cerrar sesión y eliminar el token
     */
    public function logout()
    {
        try {
            auth()->logout();

            return response()->json([
                'success' => true,
                'message' => 'Sesión cerrada correctamente.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cerrar sesión: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Obtener usuario autenticado
     */
    public function me(Request $request)
    {
        // Forzar a JWTAuth a usar el guard correcto
        auth()->shouldUse('api');

        try {
            $user = auth()->userOrFail();
            return response()->json(['user' => $user]);
        } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
            return response()->json(['error' => 'Usuario no encontrado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }

    public function updateFotoPerfil(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $request->validate([
            'foto_perfil' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Elimina la anterior si existe
        if ($user->foto_perfil && Storage::disk('public')->exists($user->foto_perfil)) {
            Storage::disk('public')->delete($user->foto_perfil);
        }

        // Guarda la nueva imagen
        $path = $request->file('foto_perfil')->store('users', 'public');

        // Actualiza el usuario
        $user->foto_perfil = $path;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Foto de perfil actualizada correctamente',
            'foto_url' => asset('storage/' . $path),
        ]);
    }
    /**
     * Cambiar contraseña sin enviar correo
     * (Desde el Dashboard)
     */
    public function cambiarContrasenaDirecto(Request $request)
    {
        $request->validate([
            'actual' => 'required',
            'nueva' => 'required|min:6',
            'confirmar' => 'required|same:nueva'
        ]);

        $user = auth()->user();

        // Verificar contraseña actual
        if (!\Hash::check($request->actual, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'La contraseña actual es incorrecta.'
            ], 400);
        }

        // Guardar nueva
        $user->password = \Hash::make($request->nueva);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Contraseña actualizada correctamente.'
        ]);
    }
}
