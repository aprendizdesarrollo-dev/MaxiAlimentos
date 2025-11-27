<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Comunicado;
use App\Models\Evento;
use Carbon\Carbon;

class EstadisticasController extends Controller
{
    public function index()
    {
        $hoy = Carbon::now();

        return response()->json([
            "empleados_activos" => User::count(),

            "comunicados_mes" => Comunicado::whereMonth('created_at', $hoy->month)
                                            ->whereYear('created_at', $hoy->year)
                                            ->count(),

            "eventos_activos" => Evento::count(),

            "modulos" => 8 // puedes cambiarlo o hacerlo dinámico
        ]);
    }
}
