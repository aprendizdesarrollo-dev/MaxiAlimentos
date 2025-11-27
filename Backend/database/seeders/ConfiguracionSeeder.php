<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ConfiguracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('configuracion')->insert([
            'modo_mantenimiento' => 'off',
            'tema' => 'claro',
            'mensaje_bienvenida' => 'Bienvenido a la intranet de MaxiAlimentos.',
            'color_primario' => '#397C3C',
            'color_secundario' => '#5bad5c',
            'footer_texto' => 'MaxiAlimentos S.A.S © 2025 — Todos los derechos reservados.',
            'notificaciones_sonido' => true,
            'notificaciones_popup' => true,
            'politica_privacidad' => 'En este espacio podrá ver la política de privacidad…',
            'terminos' => 'Términos y condiciones del sistema.',
        ]);
    }
}
