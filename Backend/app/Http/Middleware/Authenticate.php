<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
{
        // 🔥 Siempre devolvemos null para API (así lanza 401 sin buscar 'login')
        return null;

        // ⚠️ En cualquier otro caso, redirige a una ruta llamada 'login' (solo apps web)
        return route('login');
    }
}
