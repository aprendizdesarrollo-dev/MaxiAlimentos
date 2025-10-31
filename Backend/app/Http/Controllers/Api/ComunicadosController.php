<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComunicadosController extends Controller
{
    /**
     * Lista general de comunicados (visible a todos los roles autenticados)
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => [
                ['id' => 1, 'titulo' => 'Actualización de protocolos de bioseguridad', 'autor' => 'Comunicaciones'],
                ['id' => 2, 'titulo' => 'Reconocimiento a empleados destacados', 'autor' => 'Recursos Humanos'],
            ]
        ]);
    }

    /**
     * Crea un comunicado (solo Administrador o Comunicaciones)
     */
    public function store(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Comunicado creado exitosamente',
            'datos' => $request->all(),
        ]);
    }

    /**
     * Actualiza un comunicado (solo Administrador o Comunicaciones)
     */
    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => "Comunicado #$id actualizado correctamente",
        ]);
    }

    /**
     * Elimina un comunicado (solo Administrador o Comunicaciones)
     */
    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => "Comunicado #$id eliminado",
        ]);
    }
}
