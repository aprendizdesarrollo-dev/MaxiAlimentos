<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Muestra información restringida al rol "Administrador".
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        return response()->json([
            'success' => true,
            'message' => 'Bienvenido al panel de administración',
            'user' => $user->correo,
            'rol' => $user->rol,
            'fecha' => now()->toDateTimeString(),
        ]);
    }
}
