<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
{
    DB::table('users')->truncate(); // limpia la tabla antes de insertar

    DB::table('users')->insert([
        [
            'nombre' => 'Administrador General',
            'correo' => 'admin@maxialimentos.com',
            'password' => Hash::make('Admin123*'),
            'rol' => 'Administrador',
            'cedula' => '1000000000',
            'cargo' => 'Administrador del sistema',
            'area' => 'Tecnología',
            'is_verified' => 1,
        ],
        [
            'nombre' => 'Comunicaciones',
            'correo' => 'comunicaciones@maxialimentos.com',
            'password' => Hash::make('Comuni123*'),
            'rol' => 'Comunicaciones',
            'cedula' => '1000000001',
            'cargo' => 'Gestor de comunicados',
            'area' => 'Comunicaciones',
            'is_verified' => 1,
        ],
        [
            'nombre' => 'Recursos Humanos',
            'correo' => 'rrhh@maxialimentos.com',
            'password' => Hash::make('Rh123*'),
            'rol' => 'Recursos Humanos',
            'cedula' => '1000000002',
            'cargo' => 'Analista de talento humano',
            'area' => 'Recursos Humanos',
            'is_verified' => 1,
        ],
        [
            'nombre' => 'Soporte TI',
            'correo' => 'soporte@maxialimentos.com',
            'password' => Hash::make('Soporte123*'),
            'rol' => 'Soporte TI',
            'cedula' => '1000000003',
            'cargo' => 'Técnico de sistemas',
            'area' => 'TI',
            'is_verified' => 1,
        ],
        [
            'nombre' => 'Líder de Área Producción',
            'correo' => 'lider.produccion@maxialimentos.com',
            'password' => Hash::make('Produccion123*'),
            'rol' => 'Líder de área',
            'cedula' => '1000000004',
            'cargo' => 'Supervisor de planta',
            'area' => 'Producción',
            'is_verified' => 1,
        ],
    ]);
}

}
