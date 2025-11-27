<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\NotificacionHelper;

class DirectorioController extends Controller
{
    /**
     * 📄 Mostrar todos los usuarios en orden alfabético
     */
    public function index()
    {
        try {

            // Traemos todos los usuarios
            $usuarios = User::orderBy('nombre', 'asc')->get([
                'id',
                'nombre',
                'apellido',
                'cargo',
                'area',
                'correo',
                'telefono_personal',
                'correo_corporativo',
                'correo_personal',
                'rol',
                'foto_perfil' // <-- ESTA ES LA QUE FALTABA
            ]);

            // Convertimos foto_perfil en URL pública
            foreach ($usuarios as $u) {
                $u->foto_perfil = $u->foto_perfil
                    ? asset('storage/' . $u->foto_perfil)
                    : null;
            }

            return response()->json([
                'success' => true,
                'data' => $usuarios
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el directorio',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
