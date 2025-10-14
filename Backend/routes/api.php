<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmpleadoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ResetPasswordController;

//RUTA AUTENTICACION JWT 

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');

// RUTA DE RECUPERACION DE CONTRASEÑA

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);

// Enviar enlace de restablecimiento de contraseña

Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);

// Mostrar formulario de restablecer contraseña (si lo pruebas en navegador)

Route::get('/password/reset/{token}', [ResetPasswordController::class, 'showResetForm']);

// Guardar nueva contraseña

Route::post('/password/reset', [ResetPasswordController::class, 'reset']);