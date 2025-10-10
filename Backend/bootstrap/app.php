<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

/**
 * Archivo de arranque principal de Laravel.
 * Aquí se configuran las rutas, middlewares y excepciones.
 */
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // 📌 Rutas Web
        web: __DIR__.'/../routes/web.php',

        // 📌 Rutas API (las de /api/...)
        api: __DIR__.'/../routes/api.php',

        // 📌 Rutas de consola (comandos artisan personalizados)
        commands: __DIR__.'/../routes/console.php',

        // 📌 Ruta de health check (Laravel 11+)
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Aquí podrías registrar middlewares globales si los necesitas
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Aquí podrías manejar excepciones globales
    })
    ->create();
