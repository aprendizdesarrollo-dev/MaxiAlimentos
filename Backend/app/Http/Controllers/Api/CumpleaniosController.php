<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use App\Helpers\NotificacionHelper;

class CumpleaniosController extends Controller
{
    public function index()
    {
        $hoy = Carbon::today();

        // Cumpleaños próximos
        $cumpleanios = User::whereNotNull('fecha_nacimiento')
            ->get()
            ->map(function ($user) use ($hoy) {
                $fecha = Carbon::parse($user->fecha_nacimiento);

                $proximo = Carbon::create(
                    $hoy->year,
                    $fecha->month,
                    $fecha->day
                );

                if ($proximo->isBefore($hoy)) {
                    $proximo->addYear();
                }

                return [
                    'id'             => $user->id,
                    'nombre'         => $user->nombre,
                    'foto_perfil'    => $user->foto_perfil, 
                    'fecha'          => $proximo->toDateString(),
                    'fecha_legible'  => $proximo->translatedFormat('d \\de F'),
                    'dias_faltantes' => $hoy->diffInDays($proximo),
                    'tipo'           => 'cumple',
                ];
            })
            ->sortBy('dias_faltantes')
            ->values();

        // Aniversarios laborales
        $aniversarios = User::whereNotNull('fecha_ingreso')
            ->get()
            ->map(function ($user) use ($hoy) {
                $ingreso = Carbon::parse($user->fecha_ingreso);

                $proximo = Carbon::create(
                    $hoy->year,
                    $ingreso->month,
                    $ingreso->day
                );

                if ($proximo->isBefore($hoy)) {
                    $proximo->addYear();
                }

                return [
                    'id'             => $user->id,
                    'nombre'         => $user->nombre,
                    'foto_perfil'    => $user->foto_perfil, // ⭐ AGREGADO
                    'anios'          => $ingreso->diffInYears($hoy),
                    'fecha'          => $proximo->toDateString(),
                    'fecha_legible'  => $proximo->translatedFormat('d \\de F'),
                    'dias_faltantes' => $hoy->diffInDays($proximo),
                    'tipo'           => 'aniversario',
                ];
            })
            ->sortBy('dias_faltantes')
            ->values();

        // Empresa
        $fundacion = Carbon::parse(env('EMPRESA_FECHA_FUNDACION', '2012-01-01'));

        $proximoAnivEmpresa = Carbon::create(
            $hoy->year,
            $fundacion->month,
            $fundacion->day
        );

        if ($proximoAnivEmpresa->isBefore($hoy)) {
            $proximoAnivEmpresa->addYear();
        }

        $empresa = [
            'nombre'         => 'MaxiAlimentos S.A.S',
            'anios'          => $fundacion->diffInYears($hoy),
            'fecha'          => $proximoAnivEmpresa->toDateString(),
            'fecha_legible'  => $proximoAnivEmpresa->translatedFormat('d \\de F'),
            'dias_faltantes' => $hoy->diffInDays($proximoAnivEmpresa),
            'tipo'           => 'empresa',
        ];

        return response()->json([
            'cumpleanios'  => $cumpleanios,
            'aniversarios' => $aniversarios,
            'empresa'      => $empresa,
        ]);
    }
}
