<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use Carbon\Carbon;
use App\Helpers\NotificacionHelper;

class VerificationController extends Controller
{
    /**
     * Enviar código de verificación al correo y guardar datos temporalmente.
     */
    public function sendCode(Request $request)
    {
        $validated = $request->validate([
            'nombre'            => 'required|string|max:255',
            'segundo_nombre'    => 'nullable|string|max:255',
            'apellido'          => 'required|string|max:255',
            'genero'            => 'nullable|string|max:50',
            'fecha_nacimiento'  => 'nullable|date',
            'estado_civil'      => 'nullable|string|max:100',
            'telefono_personal' => 'nullable|string|max:50',
            'correo'            => 'required|string|email|max:255|unique:users',
            'correo_corporativo' => 'nullable|string|email|max:255',
            'correo_personal'   => 'nullable|string|email|max:255',
            'direccion'         => 'nullable|string|max:255',
            'ciudad'            => 'nullable|string|max:100',
            'departamento'      => 'nullable|string|max:100',
            'pais'              => 'nullable|string|max:100',
            'cedula'            => 'required|string|max:20|unique:users',
            'cargo'             => 'nullable|string|max:100',
            'area'              => 'nullable|string|max:100',
            'jefe_directo'      => 'nullable|string|max:255',
            'rol'               => 'nullable|string|max:50',
            'password'          => 'required|string|min:8|confirmed',
        ]);

        // 🔹 Generar código de verificación
        $code = rand(100000, 999999);

        // 🔹 Guardar todos los datos en caché durante 15 minutos
        Cache::put('verify_' . $validated['correo'], [
            'nombre'            => $validated['nombre'],
            'segundo_nombre'    => $request->segundo_nombre,
            'apellido'          => $validated['apellido'],
            'genero'            => $request->genero,
            'fecha_nacimiento'  => $request->fecha_nacimiento,
            'estado_civil'      => $request->estado_civil,
            'telefono_personal' => $request->telefono_personal,
            'correo'            => $validated['correo'],
            'correo_corporativo' => $request->correo_corporativo,
            'correo_personal'   => $request->correo_personal,
            'direccion'         => $request->direccion,
            'ciudad'            => $request->ciudad,
            'departamento'      => $request->departamento,
            'pais'              => $request->pais,
            'cedula'            => $validated['cedula'],
            'cargo'             => $request->cargo,
            'area'              => $request->area,
            'jefe_directo'      => $request->jefe_directo,
            'rol'               => $request->rol ?? 'Empleado',
            'password'          => Hash::make($validated['password']),
            'code'              => $code,
        ], now()->addMinutes(15));

        // ✉️ Enviar correo con el código
        Mail::to($validated['correo'])->send(new VerificationCodeMail($code, $validated['nombre']));

        return response()->json([
            'success' => true,
            'message' => 'Se envió un código de verificación al correo institucional. Tienes 15 minutos para verificarlo.',
        ]);
    }

    /**
     * Verifica el código recibido y crea el usuario.
     */
    public function verifyCode(Request $request)
    {
        $validated = $request->validate([
            'correo' => 'required|email',
            'code'   => 'required|numeric',
        ]);

        // Recuperar datos desde la caché
        $data = Cache::get('verify_' . $validated['correo']);

        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'El código expiró o no existe. Solicita uno nuevo.'
            ], 400);
        }

        if ($data['code'] != $validated['code']) {
            return response()->json([
                'success' => false,
                'message' => 'El código ingresado es incorrecto.'
            ], 400);
        }

        // Crear usuario verificado
        $user = User::create([

            'nombre' => $data['nombre'],
            'segundo_nombre' => $data['segundo_nombre'] ?? null,
            'apellido' => $data['apellido'],
            'cedula' => $data['cedula'],
            'genero' => $data['genero'] ?? null,
            'fecha_nacimiento' => $data['fecha_nacimiento'] ?? null,
            'estado_civil' => $data['estado_civil'] ?? null,
            'telefono_personal' => $data['telefono_personal'] ?? null,
            'correo' => $data['correo'],
            'correo_corporativo' => $data['correo_corporativo'] ?? null,
            'correo_personal' => $data['correo_personal'] ?? null,
            'direccion' => $data['direccion'] ?? null,
            'ciudad' => $data['ciudad'] ?? null,
            'departamento' => $data['departamento'] ?? null,
            'pais' => $data['pais'] ?? null,
            'cargo' => $data['cargo'],
            'area' => $data['area'],
            'jefe_directo' => $data['jefe_directo'] ?? null,
            'rol' => $data['rol'] ?? 'Empleado',
            'password' => Hash::make($data['password']),
            'is_verified' => true,
            'email_verified_at' => Carbon::now(),
        ]);

        NotificacionHelper::enviar(
            'Nuevo empleado registrado',
            $user->nombre . ' se ha unido a la empresa',
            'empleado',
            $user->id
        );


        // Eliminar datos temporales
        Cache::forget('verify_' . $validated['correo']);

        return response()->json([
            'success' => true,
            'message' => 'Correo verificado y usuario creado correctamente.',
            'user'    => $user,
        ]);
    }
}
