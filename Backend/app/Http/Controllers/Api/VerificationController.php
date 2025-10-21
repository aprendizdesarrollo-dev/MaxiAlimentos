<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use Carbon\Carbon;

class VerificationController extends Controller
{
    /**
     * 1️⃣ Envía el código al correo y guarda los datos temporalmente (sin crear el usuario aún)
     */
    public function sendCode(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'cedula'   => 'required|string|max:20|unique:users',
            'cargo'    => 'required|string|max:100',
            'area'     => 'required|string|max:100',
            'correo'   => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Generar código de verificación
        $code = rand(100000, 999999);

        // Guardar todos los datos en caché durante 15 minutos
        Cache::put('verify_' . $validated['correo'], [
            'nombre' => $validated['nombre'],
            'cedula' => $validated['cedula'],
            'cargo'  => $validated['cargo'],
            'area'   => $validated['area'],
            'correo' => $validated['correo'],
            'password' => Hash::make($validated['password']),
            'code' => $code,
        ], now()->addMinutes(15));

        // Enviar correo con el código
        Mail::to($validated['correo'])->send(new VerificationCodeMail($code, $validated['nombre']));

        return response()->json([
            'success' => true,
            'message' => 'Se envió un código de verificación al correo institucional. Tienes 15 minutos para verificarlo.',
        ]);
    }

    /**
     * 2️⃣ Verifica el código y crea el usuario en la base de datos.
     */
    public function verifyCode(Request $request)
    {
        $validated = $request->validate([
            'correo' => 'required|email',
            'code'   => 'required|numeric',
        ]);

        // Recuperar datos de la caché
        $data = Cache::get('verify_' . $validated['correo']);

        if (!$data) {
            return response()->json(['error' => 'El código expiró o no existe.'], 400);
        }

        if ($data['code'] != $validated['code']) {
            return response()->json(['error' => 'El código es incorrecto.'], 400);
        }

        // Crear usuario con todos los datos
        $user = User::create([
            'nombre' => $data['nombre'],
            'cedula' => $data['cedula'],
            'cargo'  => $data['cargo'],
            'area'   => $data['area'],
            'correo' => $data['correo'],
            'password' => $data['password'],
            'email_verified_at' => Carbon::now(),
        ]);

        // Borrar los datos temporales de la caché
        Cache::forget('verify_' . $validated['correo']);

        return response()->json([
            'success' => true,
            'message' => '✅ Correo verificado y usuario creado correctamente.',
            'user' => $user,
        ]);
    }
}
