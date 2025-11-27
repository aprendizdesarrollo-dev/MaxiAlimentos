<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MantenimientoMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $config = DB::table('configuracion')->first();

        if (!$config) {
            return $next($request);
        }

        if ($config->modo_mantenimiento === 'on') {

            $user = $request->user();

            if (!$user || $user->rol !== 'Administrador') {

                return response()->json([
                    'success' => false,
                    'message' => 'El sistema está en mantenimiento.',
                ], 503);

            }
        }

        return $next($request);
    }
}
