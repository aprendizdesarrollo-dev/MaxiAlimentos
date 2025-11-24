<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Configuracion;

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

        // Actualizar SOLO los campos existentes para evitar errores
        $config->update([
            'modo_mantenimiento'   => $request->modo_mantenimiento ?? $config->modo_mantenimiento,
            'tema'                 => $request->tema ?? $config->tema,
            'mensaje_bienvenida'   => $request->mensaje_bienvenida ?? $config->mensaje_bienvenida,
            'color_primario'       => $request->color_primario ?? $config->color_primario,
            'color_secundario'     => $request->color_secundario ?? $config->color_secundario,
            'footer_texto'         => $request->footer_texto ?? $config->footer_texto,
            'notificaciones_sonido'=> $request->notificaciones_sonido ?? $config->notificaciones_sonido,
            'notificaciones_popup' => $request->notificaciones_popup ?? $config->notificaciones_popup,
            'politica_privacidad'  => $request->politica_privacidad ?? $config->politica_privacidad,
            'terminos'             => $request->terminos ?? $config->terminos,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Configuración actualizada correctamente.',
            'data' => $config
        ]);
    }
}
