<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    /**
     * Envía un enlace de recuperación de contraseña al correo del usuario.
     */
    public function sendResetLink(Request $request)
    {
        // Validar el correo recibido
        $request->validate([
            'email' => 'required|email',
        ]);

        //  Intentar enviar el enlace de recuperación
        $status = Password::sendResetLink($request->only('email'));

        //  Si se envía correctamente
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 200);
        }

        //  Si hay error (correo no registrado, etc.)
        return response()->json(['error' => __($status)], 400);
    }
}
