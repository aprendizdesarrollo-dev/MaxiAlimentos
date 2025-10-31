<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Uso en rutas: ->middleware('role:Administrador,Comunicaciones')
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Compara contra la columna 'rol' de la tabla users (string)
        $userRole = (string) $user->rol;

        if (!in_array($userRole, $roles, true)) {
            return response()->json(['message' => 'Acceso no autorizado'], 403);
        }

        return $next($request);
    }
}
