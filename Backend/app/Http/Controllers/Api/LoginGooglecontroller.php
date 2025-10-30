<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Google\Client as GoogleClient;

class LoginGoogleController extends Controller
{
    public function login(Request $request)
    {
        try {
            if (!$request->filled('token')) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se recibió el token de Google.',
                ], 400);
            }

            $token = $request->input('token');
            \Log::info(' Entrando al método loginGoogle correctamente.');
            \Log::info(' Token recibido: ' . substr($token, 0, 30) . '...'); 

            $client = new GoogleClient();
            $client->setClientId(env('GOOGLE_CLIENT_ID'));
            $payload = $client->verifyIdToken($token);

            if (!$payload) {
                \Log::error('❌ No se pudo verificar el token de Google.');
                return response()->json([
                    'success' => false,
                    'message' => 'Token inválido o expirado.',
                ], 401);
            }

            $email = $payload['email'];
            $nombre = $payload['name'] ?? 'Usuario Google';

            // Solo correos @maxialimentos.com
            if (!str_ends_with($email, '@maxialimentos.com')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se permiten correos corporativos @maxialimentos.com',
                ], 403);
            }

            // Buscar o crear usuario
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
            return response()->json([
                'success' => false,
                'message' => 'Error interno: ' . $e->getMessage(),
            ], 500);
        }
    }
}
