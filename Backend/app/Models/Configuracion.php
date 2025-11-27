<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    protected $table = "configuracion";

    protected $fillable = [
        'modo_mantenimiento',
        'tema',
        'mensaje_bienvenida',
        'color_primario',
        'color_secundario',
        'footer_texto',
        'notificaciones_sonido',
        'notificaciones_popup',
        'politica_privacidad',
        'terminos',
    ];
}

