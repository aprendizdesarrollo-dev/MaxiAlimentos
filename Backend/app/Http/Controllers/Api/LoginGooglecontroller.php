<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class LoginGoogleController extends Controller
{
    /**
     * Maneja el inicio de sesión con Google
     */
    public function handleGoogleLogin(Request $request)
    {
        try {
            \Log::info('🟢 Datos recibidos desde el frontend:', $request->all());

            // 1️⃣ Verificamos si el token viene desde el frontend
            if (!$request->has('credential')) {
                return response()->json(['success' => false, 'message' => 'Token de Google no recibido'], 400);
            }

            // 2️⃣ Decodificamos el JWT de Google manualmente
            $jwtParts = explode('.', $request->credential);
            if (count($jwtParts) < 2) {
                return response()->json(['success' => false, 'message' => 'Token de Google inválido'], 400);
            }

            $payload = json_decode(base64_decode(strtr($jwtParts[1], '-_', '+/')), true);
            \Log::info('📦 Payload decodificado:', $payload);

            if (!$payload || !isset($payload['email'])) {
                return response()->json(['success' => false, 'message' => 'No se pudo obtener el correo del token'], 400);
            }

            // 3️⃣ Obtenemos los datos principales del usuario
            $email = $payload['email'];
            $name = $payload['name'] ?? 'Empleado Google';

            // 4️⃣ Validamos que el correo pertenezca al dominio corporativo
            if (!str_ends_with($email, '@maxialimentos.com')) {
                \Log::warning('⚠️ Correo no corporativo: ' . $email);
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se permiten correos corporativos (@maxialimentos.com)'
                ], 403);
            }

            \Log::info('✅ Correo validado: ' . $email);

            // 5️⃣ Buscamos o creamos el usuario con datos por defecto
            $user = User::firstOrCreate(
                ['correo' => $email],
                [
                    'nombre' => $name,
                    'cedula' => '0000000000',      // valor temporal
                    'cargo' => 'Sin asignar',       // valor por defecto
                    'area' => 'Sin asignar',        // valor por defecto
                    'rol' => 'Empleado',            // valor por defecto
                    'password' => Hash::make('google_default_pass'),
                ]
            );

            \Log::info('🧑 Usuario encontrado o creado:', ['id' => $user->id, 'correo' => $user->correo]);

            // 6️⃣ Generamos el token JWT
            $token = JWTAuth::fromUser($user);
            \Log::info('🔑 Token JWT generado correctamente');

            // 7️⃣ Si el usuario tiene campos por completar
            $completo = !(
                empty($user->cedula) ||
                $user->cedula === '0000000000' ||
                $user->cargo === 'Sin asignar' ||
                $user->area === 'Sin asignar'
            );

            // 8️⃣ Respuesta exitosa
            return response()->json([
                'success' => true,
                'access_token' => $token,
                'user' => $user,
                'completo' => $completo,
            ]);

        } catch (Exception $e) {
            \Log::error('❌ Error en handleGoogleLogin: ' . $e->getMessage() . ' | Línea: ' . $e->getLine());
            return response()->json([
                'success' => false,
                'message' => 'Error interno: ' . $e->getMessage(),
            ], 500);
        }
    }
}
