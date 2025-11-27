<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notificacion;
use App\Helpers\NotificacionHelper;
use App\Models\User;

class NotificacionController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Notificacion::latest()->take(30)->get()
        ]);
    }

    public function marcarLeidas()
    {
        Notificacion::query()->update(['leida' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Notificaciones marcadas como leídas'
        ]);
    }


    public function generarCumpleanios()
    {
        $hoy = date('m-d'); // Ejemplo: 11-26

        $usuarios = \App\Models\User::whereRaw("DATE_FORMAT(fecha_nacimiento, '%m-%d') = ?", [$hoy])->get();

        foreach ($usuarios as $u) {

            // ❗️Verificar si YA se generó una notificación HOY para este usuario
            $yaExiste = \App\Models\Notificacion::where('tipo', 'cumpleanios')
                ->where('relacion_id', $u->id)
                ->whereDate('created_at', now()->toDateString())
                ->exists();

            if ($yaExiste) {
                continue; // Evitar duplicados
            }

            // Crear notificación
            NotificacionHelper::enviar(
                "Hoy es el cumpleaños de {$u->nombre}",
                "¡Celebremos a {$u->nombre}!",
                "cumpleanios",
                $u->id
            );
        }

        return response()->json([
            'success' => true,
            'cantidad' => count($usuarios),
            'message' => "Notificaciones generadas correctamente (sin duplicados)."
        ]);
    }


    public function generarAniversarios()
    {
        $hoy = date('m-d');

        $usuarios = User::whereRaw("DATE_FORMAT(fecha_ingreso, '%m-%d') = ?", [$hoy])->get();

        foreach ($usuarios as $u) {

            $yaExiste = Notificacion::where('tipo', 'aniversario')
                ->where('relacion_id', $u->id)
                ->whereDate('created_at', today())
                ->exists();

            if ($yaExiste) continue;

            $anios = now()->year - date('Y', strtotime($u->fecha_ingreso));

            NotificacionHelper::enviar(
                "Aniversario laboral de {$u->nombre}",
                "Hoy cumple {$anios} años con la empresa.",
                "aniversario",
                $u->id
            );
        }

        return response()->json(['success' => true]);
    }
    public function generarCumpleEmpresa()
    {
        $empresaFecha = '2005-11-26'; // La cambias por la real
        $hoy = date('m-d');

        if ($hoy !== date('m-d', strtotime($empresaFecha))) {
            return response()->json(['success' => true]);
        }

        $yaExiste = Notificacion::where('tipo', 'empresa')
            ->whereDate('created_at', today())
            ->exists();

        if ($yaExiste) return response()->json(['success' => true]);

        $anios = now()->year - date('Y', strtotime($empresaFecha));

        NotificacionHelper::enviar(
            "Hoy es el cumpleaños de MaxiAlimentos",
            "Celebramos {$anios} años creciendo juntos.",
            "empresa",
            null
        );

        return response()->json(['success' => true]);
    }


    public function destroy($id)
    {
        $noti = Notificacion::find($id);

        if (!$noti) {
            return response()->json(['success' => false, 'message' => 'Notificación no encontrada'], 404);
        }

        $noti->delete();

        return response()->json(['success' => true, 'message' => 'Notificación eliminada']);
    }


    public function destroyAll()
    {
        Notificacion::query()->delete();

        return response()->json(['success' => true, 'message' => 'Todas las notificaciones fueron eliminadas']);
    }
}
