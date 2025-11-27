<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Configuracion;
use Illuminate\Support\Facades\Validator;

class ConfiguracionController extends Controller
{
    // ======================================
    // GET: Obtener configuración del sistema
    // ======================================
    public function index()
    {
        $config = Configuracion::first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'No existe configuración registrada.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }


    // ======================================
    // PUT: Actualizar configuración
    // ======================================
    public function update(Request $request)
    {
        $config = Configuracion::first();

        if (!$config) {
            return response()->json([
                'success' => false,
                'message' => 'No existe configuración para actualizar.'
            ], 404);
        }

        // VALIDACIÓN PREMIUM
        $validator = Validator::make($request->all(), [
            'modo_mantenimiento'   => 'nullable|in:on,off',
            'tema'                 => 'nullable|in:claro,oscuro',
            'mensaje_bienvenida'   => 'nullable|string|max:255',
            'color_primario'       => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'color_secundario'     => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/',
            'footer_texto'         => 'nullable|string|max:255',
            'notificaciones_sonido'=> 'nullable|boolean',
            'notificaciones_popup' => 'nullable|boolean',
            'politica_privacidad'  => 'nullable|string',
            'terminos'             => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Actualizar solo campos enviados
        $config->fill($validator->validated());
        $config->save();

        return response()->json([
            'success' => true,
            'message' => 'Configuración actualizada correctamente.',
            'data' => $config
        ]);
    }
}
