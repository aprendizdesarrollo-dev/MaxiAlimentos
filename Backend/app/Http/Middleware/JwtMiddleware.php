<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Exception;
use App\Models\User;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            auth()->shouldUse('api');
            config(['jwt.identifier' => 'correo']);
            config(['auth.defaults.guard' => 'api']);
            config(['auth.providers.users.model' => User::class]);

            $payload = JWTAuth::parseToken()->getPayload();
            $userId = $payload->get('sub'); // ID del usuario dentro del token

            $user = User::find($userId);

            if (!$user) {
                return response()->json([
                    'error' => 'Usuario no encontrado en la BD (JWT ok)',
                    'payload_sub' => $userId,
                    'users_in_db' => User::pluck('id', 'correo'),
                ], 401);
            }

            auth()->login($user);
            $request->auth = $user;

        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (Exception $e) {
            return response()->json(['error' => 'Token no encontrado o no enviado'], 401);
        }

        return $next($request);
    }
}
