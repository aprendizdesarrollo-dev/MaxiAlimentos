<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Beneficio;
use Illuminate\Support\Facades\Storage;
use App\Helpers\NotificacionHelper;

class BeneficiosController extends Controller
{
    // LISTAR
    public function index()
    {
        $beneficios = Beneficio::orderBy('id', 'desc')->get()->map(function ($b) {
            $b->imagen_url = $b->imagen
                ? asset("storage/" . $b->imagen)
                : null;

            return $b;
        });

        return response()->json([
            'success' => true,
            'data' => $beneficios
        ]);
    }


    // GUARDAR
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|max:4096',
            'vigencia_desde' => 'nullable|date',
            'vigencia_hasta' => 'nullable|date',
            'estado' => 'nullable|string'
        ]);

        $ruta = null;

        if ($request->hasFile('imagen')) {
            $ruta = $request->file('imagen')->store('beneficios', 'public');
        }

        $beneficio = Beneficio::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'imagen' => $ruta,
            'vigencia_desde' => $request->vigencia_desde,
            'vigencia_hasta' => $request->vigencia_hasta,
            'estado' => $request->estado ?? 'activo'
        ]);

        NotificacionHelper::enviar(
            'Nuevo beneficio disponible',
            $beneficio->titulo,
            'beneficio',
            $beneficio->id
        );




        // agregar imagen_url
        $beneficio->imagen_url = $ruta ? asset("storage/$ruta") : null;

        return response()->json([
            'success' => true,
            'data' => $beneficio
        ]);
    }


    // OBTENER
    public function show($id)
    {
        $beneficio = Beneficio::findOrFail($id);
        $beneficio->imagen_url = $beneficio->imagen
            ? asset("storage/" . $beneficio->imagen)
            : null;

        return response()->json([
            'success' => true,
            'data' => $beneficio
        ]);
    }


    // ACTUALIZAR
    public function update(Request $request, $id)
    {
        $beneficio = Beneficio::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'vigencia_desde' => 'nullable|date',
            'vigencia_hasta' => 'nullable|date',
            'estado' => 'nullable|string',
            'imagen' => 'nullable|image|max:4096'
        ]);

        // Si llega nueva imagen
        if ($request->hasFile('imagen')) {

            // Borrar la anterior
            if ($beneficio->imagen && Storage::disk('public')->exists($beneficio->imagen)) {
                Storage::disk('public')->delete($beneficio->imagen);
            }

            // Guardar nueva
            $beneficio->imagen = $request->file('imagen')->store('beneficios', 'public');
        }

        // Actualizar otros datos
        $beneficio->update([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'vigencia_desde' => $request->vigencia_desde,
            'vigencia_hasta' => $request->vigencia_hasta,
            'estado' => $request->estado ?? $beneficio->estado
        ]);

        // agregar imagen_url
        $beneficio->imagen_url = $beneficio->imagen
            ? asset("storage/" . $beneficio->imagen)
            : null;

        return response()->json([
            'success' => true,
            'message' => 'Beneficio actualizado',
            'data' => $beneficio
        ]);
    }


    // ELIMINAR
    public function destroy($id)
    {
        $beneficio = Beneficio::findOrFail($id);

        if ($beneficio->imagen && Storage::disk('public')->exists($beneficio->imagen)) {
            Storage::disk('public')->delete($beneficio->imagen);
        }

        $beneficio->delete();

        return response()->json([
            'success' => true,
            'message' => 'Beneficio eliminado'
        ]);
    }
}
