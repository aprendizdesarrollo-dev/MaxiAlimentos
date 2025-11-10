<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Ejecuta las migraciones.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // 🧍‍♂️ Datos personales
            $table->string('nombre');
            $table->string('segundo_nombre')->nullable();
            $table->string('apellido');
            $table->string('genero')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('estado_civil')->nullable();

            // ☎️ Datos de contacto
            $table->string('telefono_personal')->nullable();
            $table->string('correo')->unique();                // principal para login
            $table->string('correo_corporativo')->nullable();  // correo interno de la empresa
            $table->string('correo_personal')->nullable();     // correo alternativo
            $table->string('direccion')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('departamento')->nullable();
            $table->string('pais')->nullable();

            // 💼 Datos laborales
            $table->string('cedula')->unique();
            $table->string('cargo')->nullable();
            $table->string('area')->nullable();
            $table->string('jefe_directo')->nullable();

            // ⚙️ Sistema y roles
            $table->string('rol')->default('Empleado');
            $table->boolean('is_verified')->default(false);
            $table->string('verification_token')->nullable();
            $table->timestamp('email_verified_at')->nullable();

            // 🔒 Autenticación
            $table->string('password')->nullable(); // ahora opcional (por login Google o interno)
            $table->rememberToken();
            $table->timestamps();
        });

        // 🔑 Tabla para restablecimiento de contraseñas
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('correo')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 🧩 Tabla de sesiones
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Revierte las migraciones.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
