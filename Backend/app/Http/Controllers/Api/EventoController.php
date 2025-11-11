<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Evento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EventoController extends Controller
{
    // 📌 Listar todos los eventos
    public function index()
    {
        $eventos = Evento::orderBy('fecha', 'desc')->get();

        return response()->json(['data' => $eventos], 200);
    }

    // 📌 Crear nuevo evento
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha' => 'required|date',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
        ]);

        $evento = new Evento();
        $evento->titulo = $request->titulo;
        $evento->descripcion = $request->descripcion;
        $evento->fecha = $request->fecha;

        // ✅ Guardar imagen si se envía
        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('eventos', 'public');
            $evento->imagen = asset('storage/' . $path);
        }

        $evento->save();

        return response()->json([
            'success' => true,
            'message' => 'Evento creado correctamente',
            'data' => $evento,
        ], 201);
    }

    // 📌 Mostrar un evento específico
    public function show($id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json([
                'success' => false,
                'message' => 'Evento no encontrado',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $evento,
        ]);
    }

    // 📌 Actualizar evento (incluye imagen)
    public function update(Request $request, $id)
    {
        try {
            Log::info('Datos recibidos para actualizar:', $request->all());

            $evento = Evento::findOrFail($id);

            $validatedData = $request->validate([
                'titulo' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'fecha' => 'required|date',
                'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120',
            ]);

            $evento->titulo = $validatedData['titulo'];
            $evento->descripcion = $validatedData['descripcion'];
            $evento->fecha = $validatedData['fecha'];

            // ✅ Si se sube nueva imagen
            if ($request->hasFile('imagen')) {
                // Borrar anterior si existe
                if ($evento->imagen) {
                    $oldPath = str_replace(asset('storage/'), '', $evento->imagen);
                    Storage::disk('public')->delete($oldPath);
                }

                // Guardar nueva imagen
                $path = $request->file('imagen')->store('eventos', 'public');
                $evento->imagen = asset('storage/' . $path);
            } else {
                Log::info('No se subió nueva imagen, se conserva la anterior');
            }

            $evento->save();

            return response()->json([
                'success' => true,
                'message' => 'Evento actualizado correctamente',
                'data' => $evento,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Error de validación: ' . json_encode($e->errors()));

            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error al actualizar evento: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // 📌 Eliminar evento
    public function destroy($id)
    {
        $evento = Evento::find($id);

        if (!$evento) {
            return response()->json([
                'success' => false,
                'message' => 'Evento no encontrado',
            ], 404);
        }

        // Eliminar imagen del storage
        if ($evento->imagen) {
            $oldPath = str_replace(asset('storage/'), '', $evento->imagen);
            Storage::disk('public')->delete($oldPath);
        }

        $evento->delete();

        return response()->json([
            'success' => true,
            'message' => 'Evento eliminado correctamente',
        ]);
    }
}
