<?php

use App\Models\User;
use App\Helpers\NotificacionHelper;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {

    // Fecha actual (mes-día)
    $hoy = now()->format('m-d');

    // Buscar usuarios que cumplen años hoy
    $cumpleanieros = User::whereRaw("DATE_FORMAT(fecha_nacimiento, '%m-%d') = ?", [$hoy])->get();

    foreach ($cumpleanieros as $user) {
        NotificacionHelper::enviar(
            'Cumpleaños de ' . $user->nombre,
            'Hoy está de cumpleaños ' . $user->nombre,
            'cumpleaños',
            $user->id
        );
    }

})->dailyAt('06:00');  // Se ejecuta todos los días a las 6 AM

