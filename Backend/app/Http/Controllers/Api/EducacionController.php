<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use App\Models\UserEducacion;

class EducacionController extends Controller
{
    /**
     * Listar todas las educaciones del usuario autenticado
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $educaciones = $user->educaciones()->orderBy('fecha_inicio', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $educaciones
        ]);
    }

    /**
     * Agregar una nueva educación
     */
    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $validator = Validator::make($request->all(), [
            'institucion' => 'required|string|max:255',
            'titulo' => 'nullable|string|max:255',
            'nivel' => 'nullable|string|max:100',
            'especializacion' => 'nullable|string|max:255',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $educacion = new UserEducacion($validator->validated());
        $educacion->user_id = $user->id;
        $educacion->save();

        return response()->json([
            'success' => true,
            'message' => 'Educación agregada correctamente.',
            'data' => $educacion
        ]);
    }

    /**
     * Actualizar educación
     */
    public function update(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $educacion = UserEducacion::where('user_id', $user->id)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'institucion' => 'required|string|max:255',
            'titulo' => 'nullable|string|max:255',
            'nivel' => 'nullable|string|max:100',
            'especializacion' => 'nullable|string|max:255',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $educacion->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Educación actualizada correctamente.',
            'data' => $educacion
        ]);
    }

    /**
     * Eliminar una educación
     */
    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $educacion = UserEducacion::where('user_id', $user->id)->findOrFail($id);
        $educacion->delete();

        return response()->json([
            'success' => true,
            'message' => 'Educación eliminada correctamente.'
        ]);
    }
}
