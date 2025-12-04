<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))

    ->withMiddleware(function (Middleware $middleware) {

        // Grupo API
        $middleware->group('api', [
            \App\Http\Middleware\MantenimientoMiddleware::class,
            'last.activity',    // <-- AQUI AÑADIDO
        ]);

        // Aliases
        $middleware->alias([
            'jwt.auth'       => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
            'jwt.refresh'    => \Tymon\JWTAuth\Http\Middleware\RefreshToken::class,
            'role'           => \App\Http\Middleware\CheckRole::class,
            'last.activity'  => \App\Http\Middleware\LastUserActivity::class, // <-- ESTE DEBE EXISTIR
        ]);
    })

    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
