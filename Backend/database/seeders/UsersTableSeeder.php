<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 Limpia la tabla antes de insertar (solo si no tienes relaciones)
        DB::table('users')->delete(); 

        DB::table('users')->insert([
            [
                // 🧍‍♂️ Datos personales
                'nombre' => 'Administrador',
                'segundo_nombre' => 'General',
                'apellido' => 'Principal',
                'genero' => 'Masculino',
                'fecha_nacimiento' => '1990-01-01',
                'estado_civil' => 'Soltero',

                // ☎️ Datos de contacto
                'telefono_personal' => '3001234567',
                'correo' => 'admin@maxialimentos.com',
                'correo_corporativo' => 'admin@maxialimentos.com',
                'correo_personal' => 'admin.personal@gmail.com',
                'direccion' => 'Calle 123 #45-67',
                'ciudad' => 'Bogotá',
                'departamento' => 'Cundinamarca',
                'pais' => 'Colombia',

                // 💼 Datos laborales
                'cedula' => '1000000000',
                'cargo' => 'Administrador del sistema',
                'area' => 'Tecnología',
                'jefe_directo' => 'Gerencia General',

                // ⚙️ Configuración del sistema
                'rol' => 'Administrador',
                'is_verified' => 1,
                'verification_token' => null,
                'email_verified_at' => now(),
                'password' => Hash::make('Admin123*'),

                // Timestamps automáticos
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

