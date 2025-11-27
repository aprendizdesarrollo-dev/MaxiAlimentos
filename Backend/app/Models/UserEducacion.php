<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEducacion extends Model
{
    use HasFactory;

    protected $table = 'user_educaciones';

    protected $fillable = [
        'user_id',
        'institucion',
        'titulo',
        'nivel',
        'especializacion',
        'fecha_inicio',
        'fecha_fin',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
