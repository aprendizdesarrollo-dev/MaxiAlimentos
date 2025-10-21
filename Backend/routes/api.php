<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VerificationController;

// RUTAS DE LOGUEO

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth.jwt')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);});

//RUTAS DE RESTABLECER CONTRASEÑA    

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);


//RUTA DE VERIFICACION DE CORREO

Route::post('/register-temp', [VerificationController::class, 'sendCode']);
Route::post('/verify-temp', [VerificationController::class, 'verifyCode']);
