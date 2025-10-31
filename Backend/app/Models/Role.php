<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'rol';
    protected $fillable = ['nombre', 'descripcion'];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
