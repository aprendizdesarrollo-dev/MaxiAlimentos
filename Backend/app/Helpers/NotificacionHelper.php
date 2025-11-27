<?php

namespace App\Helpers;

use App\Models\Notificacion;

class NotificacionHelper
{
    public static function enviar($titulo, $mensaje, $tipo, $relacion_id = null)
    {
        return Notificacion::create([
            'titulo' => $titulo,
            'mensaje' => $mensaje,
            'tipo' => $tipo,
            'relacion_id' => $relacion_id,
            'leida' => false,   // <--- FIX DEFINITIVO
            'user_id' => null,
        ]);
    }
}
