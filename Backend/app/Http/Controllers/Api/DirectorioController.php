<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class DirectorioController extends Controller
{
    /**
     * 📄 Mostrar todos los usuarios en orden alfabético
     */
    public function index()
    {
        try {
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
                'rol'
            ]);

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
