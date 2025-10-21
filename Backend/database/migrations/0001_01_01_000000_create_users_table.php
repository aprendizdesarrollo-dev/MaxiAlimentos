<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // 🔹 Campos principales
            $table->string('nombre');
            $table->string('correo')->unique();
            $table->string('password');
            $table->string('cedula')->unique();
            $table->string('cargo')->nullable();
            $table->string('area')->nullable();
            $table->string('rol')->default('Empleado');

            // 🔹 Verificación
            $table->boolean('is_verified')->default(false);
            $table->string('verification_token')->nullable();
            $table->timestamp('email_verified_at')->nullable();

            // 🔹 Tokens de sesión
            $table->rememberToken();
            $table->timestamps();
        });

        // 🔹 Tabla para restablecimiento de contraseñas
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('correo')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 🔹 Tabla de sesiones
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
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
