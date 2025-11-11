<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Google_Client;

class LoginGoogleController extends Controller
{
   public function login(Request $request)
{
    try {
        // Aceptar tanto "credential" como "token"
        $token = $request->input('token') ?? $request->input('credential');


        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'No se recibió el token de Google.',
            ], 400);
        }

        \Log::info(' Entrando al método loginGoogle correctamente.');
        \Log::info(' Token recibido: ' . substr($token, 0, 30) . '...');

        $client = new \Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $payload = $client->verifyIdToken($token);

        if (!$payload) {
            \Log::error(' No se pudo verificar el token de Google.');
            return response()->json([
                'success' => false,
                'message' => 'Token inválido o expirado.',
            ], 401);
        }

        \Log::info(' Payload verificado:', $payload);

        $email = $payload['email'];
        $nombre = $payload['name'] ?? 'Usuario Google';

        // Solo correos @maxialimentos.com
        if (!str_ends_with($email, '@maxialimentos.com')) {
            return response()->json([
                'success' => false,
                'message' => 'Solo se permiten correos corporativos @maxialimentos.com',
            ], 403);
        }

        $user = User::firstOrCreate(
            ['correo' => $email],
            [
                'nombre' => $nombre,
                'password' => Hash::make(uniqid()),
                'rol' => 'Empleado',
                'is_verified' => true,
            ]
        );

        $jwt = JWTAuth::fromUser($user);
        $requiresData = empty($user->cargo) || empty($user->area);

        return response()->json([
            'success' => true,
            'access_token' => $jwt,
            'requires_data' => $requiresData,
            'user' => [
                'nombre' => $user->nombre,
                'correo' => $user->correo,
                'cargo' => $user->cargo,
                'area' => $user->area,
            ],
        ]);
    } catch (\Exception $e) {
        \Log::error('Error interno: ' . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Error interno: ' . $e->getMessage(),
        ], 500);
    }
}

}
