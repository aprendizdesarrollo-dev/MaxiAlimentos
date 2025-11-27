<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use HasFactory;

    protected $table = 'users';

   protected $fillable = [
    'nombre',
    'segundo_nombre',
    'apellido',
    'genero',
    'fecha_nacimiento',
    'estado_civil',
    'telefono_personal',
    'correo',
    'correo_corporativo',
    'correo_personal',
    'direccion',
    'ciudad',
    'departamento',
    'pais',
    'cedula',
    'cargo',
    'area',
    'jefe_directo',
    'rol',
    'is_verified',
    'verification_token',
    'email_verified_at',
    'foto_perfil',
];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Métodos requeridos por JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function educaciones()
    {
        return $this->hasMany(UserEducacion::class);
    }

}
