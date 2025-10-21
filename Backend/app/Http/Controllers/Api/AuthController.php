<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Registro de usuario (solo crea cuenta)
     */
   public function register(Request $request)
{
    try {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'correo'   => 'required|string|email|max:255|unique:users,correo',
            'password' => 'required|string|min:6|confirmed',
            'cedula'   => 'required|string|max:20|unique:users,cedula',
            'cargo'    => 'nullable|string|max:100',
            'area'     => 'nullable|string|max:100',
        ]);

        $user = User::create([
            'nombre'   => $validated['nombre'],
            'correo'   => $validated['correo'],
            'password' => Hash::make($validated['password']),
            'cedula'   => $validated['cedula'],
            'cargo'    => $validated['cargo'] ?? null,
            'area'     => $validated['area'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado correctamente.',
            'user'    => $user
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Detecta si el error es por correo duplicado o cédula duplicada
        if (isset($e->errors()['correo'])) {
            return response()->json([
                'success' => false,
                'message' => 'El correo ya está registrado. Intenta con otro por favor.'
            ], 409);
        }

        if (isset($e->errors()['cedula'])) {
            return response()->json([
                'success' => false,
                'message' => 'La cédula ya está registrada. Verifica los datos.'
            ], 409);
        }

        // Si es otro error de validación normal
        return response()->json([
            'success' => false,
            'message' => 'Datos inválidos.',
            'errors'  => $e->errors()
        ], 422);
    } catch (\Exception $ex) {
        // Cualquier otro error inesperado
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
    auth()->shouldUse('api'); // 🔥 Forzamos el guard de JWT

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
    // 🔥 Forzar a JWTAuth a usar el guard correcto
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


}
