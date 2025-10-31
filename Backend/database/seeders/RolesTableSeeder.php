<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
public function run(): void
{
    DB::table('roles')->truncate(); // limpia la tabla antes de insertar

    DB::table('roles')->insert([
        ['nombre' => 'Administrador', 'descripcion' => 'Acceso total al sistema'],
        ['nombre' => 'Comunicaciones', 'descripcion' => 'Publica comunicados internos'],
        ['nombre' => 'Recursos Humanos', 'descripcion' => 'Gestiona solicitudes y certificados'],
        ['nombre' => 'Soporte TI', 'descripcion' => 'Gestiona tickets y soporte técnico'],
        ['nombre' => 'Líder de área', 'descripcion' => 'Aprueba solicitudes y revisa reportes'],
        ['nombre' => 'Colaborador', 'descripcion' => 'Accede a comunicados y realiza solicitudes'],
    ]);
}

}