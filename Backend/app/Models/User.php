<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $table = 'users';

    protected $fillable = [
        'nombre',
        'correo',
        'password',
        'cedula',
        'cargo',
        'area',
        'rol',
        'is_verified',
        'verification_token',
    ];
    protected $hidden = ['password', 'remember_token'];

    /**
     * 🔥 Le decimos a Laravel que el campo para login es 'correo'
     */
    public function getAuthIdentifierName()
    {
        return 'correo';
    }

    /**
     * Métodos requeridos por JWT
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
