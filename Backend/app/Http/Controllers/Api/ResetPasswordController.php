<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $request->validate([
            'correo' => 'required|email|exists:users,correo',
            'token' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('correo', $request->correo)
            ->where('token', $request->token)
            ->first();

        if (!$record) {
            return response()->json([
                'success' => false,
                'message' => 'El enlace de recuperación no es válido o ha expirado.',
            ], 400);
        }

        $user = User::where('correo', $request->correo)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Eliminar token usado
        DB::table('password_reset_tokens')
            ->where('correo', $request->correo)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contraseña restablecida correctamente. Ahora puedes iniciar sesión.',
        ]);
    }
}
