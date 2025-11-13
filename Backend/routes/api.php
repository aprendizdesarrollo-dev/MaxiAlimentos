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
use App\Http\Controllers\Api\EventoController;
use App\Http\Controllers\Api\PerfilController;
use App\Http\Controllers\Api\DirectorioController;


    // RUTAS DE LOGUEO

    //Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('jwt.auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);});
    Route::post('/google-login', [LoginGoogleController::class, 'login']);
    Route::middleware('auth:api')->put('/user/update', [UserController::class, 'update']);
    Route::post('/perfil/foto', [AuthController::class, 'updateFotoPerfil']);


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

    // RUTA EVENTOS DASHBOARD ADMIN
    
    Route::get('/eventos', [EventoController::class, 'index']);
    Route::post('/eventos', [EventoController::class, 'store']);
    Route::get('/eventos/{id}', [EventoController::class, 'show']);
    Route::put('/eventos/{id}', [EventoController::class, 'update']);
    Route::delete('/eventos/{id}', [EventoController::class, 'destroy']);


    // RUTA DE COMUNICADOS


   Route::middleware('jwt.auth')->group(function () {
    Route::get('/comunicados', [ComunicadosController::class, 'index']);
    Route::post('/comunicados', [ComunicadosController::class, 'store']);
    Route::get('/comunicados/{id}', [ComunicadosController::class, 'show']);
    Route::put('/comunicados/{id}', [ComunicadosController::class, 'update']);
    Route::delete('/comunicados/{id}', [ComunicadosController::class, 'destroy']);
    });

    // RUTAS DIRECTORIO

    Route::get('/directorio', [DirectorioController::class, 'index']);

    // RUTAS PERFIL
    
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/perfil', [PerfilController::class, 'show']);
        Route::put('/perfil', [PerfilController::class, 'update']);
        Route::post('/perfil/foto', [PerfilController::class, 'updateFoto']);});
    Route::post('/perfil/foto', [PerfilController::class, 'actualizarFoto']);



