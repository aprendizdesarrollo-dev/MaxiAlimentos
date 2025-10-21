<?php

namespace App\Http\Middleware;

use Closure;

class HandleCors
{
    /**
     * Habilita CORS entre React (localhost:5173) y Laravel (localhost:8000)
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:5173');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        if ($request->getMethod() === 'OPTIONS') {
            return response('', 204, $response->headers->all());
        }

        return $response;
    }
}
