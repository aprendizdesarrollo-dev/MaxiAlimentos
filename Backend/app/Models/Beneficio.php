<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Beneficio extends Model
{
    protected $fillable = [
        'titulo',
        'descripcion',
        'imagen',
        'vigencia_desde',
        'vigencia_hasta',
        'estado',
    ];

    public function getImagenUrlAttribute()
    {
        return $this->imagen 
            ? asset("storage/" . $this->imagen)
            : null;
    }
}