<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\Api\VerificationController;
use App\Http\Controllers\Api\LoginGoogleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ComunicadosController;

// RUTAS DE LOGUEO

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('jwt.auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);});
Route::post('/google-login', [LoginGoogleController::class, 'login']);
Route::middleware('auth:api')->put('/user/update', [UserController::class, 'update']);

//RUTAS DE RESTABLECER CONTRASEÑA    

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);

//RUTA DE VERIFICACION DE CORREO

Route::post('/register-temp', [VerificationController::class, 'sendCode']);
Route::post('/verify-temp', [VerificationController::class, 'verifyCode']);

//RUTA DE SEEDERS

 // Solo Administrador
    Route::middleware(['role:Administrador'])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index']);
    });

    // Administrador o Comunicaciones
    Route::middleware(['role:Administrador,Comunicaciones'])->group(function () {
        Route::post('/comunicados', [ComunicadosController::class, 'store']);
        Route::put('/comunicados/{id}', [ComunicadosController::class, 'update']);
        Route::delete('/comunicados/{id}', [ComunicadosController::class, 'destroy']);
    });

    // Acceso general autenticado
    Route::get('/comunicados', [ComunicadosController::class, 'index']);
