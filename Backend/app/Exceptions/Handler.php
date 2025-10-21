<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Excepciones que no se deben reportar.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [];

    /**
     * Campos que nunca deben mostrarse en validaciones fallidas.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Registra los manejadores de excepciones para la aplicación.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Este método se ejecuta cuando un usuario no autenticado
     * intenta acceder a una ruta protegida por middleware auth o jwt.auth.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Si la petición es una API o espera JSON, devolvemos error 401
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'error' => 'No autenticado o token inválido'
            ], 401);
        }

        // En caso contrario, aborta con 401 sin redirigir a login
        abort(401, 'No autenticado');
    }
}
