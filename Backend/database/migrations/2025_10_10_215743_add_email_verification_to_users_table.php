<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Agrega columnas para manejar la verificación por correo.
     * - verification_token: token único enviado por email para activar la cuenta.
     * - is_verified: bandera booleana para saber si el usuario confirmó su correo.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // token puede ser null hasta que el usuario solicite/reciba verificación
            $table->string('verification_token', 100)->nullable()->after('rol');
            // por defecto las cuentas nuevas NO están verificadas
            $table->boolean('is_verified')->default(false)->after('verification_token');

            // índice opcional para búsquedas rápidas por token
            $table->index('verification_token');
        });
    }

    /**
     * Reversa los cambios por si hay que volver atrás.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['verification_token']);
            $table->dropColumn(['verification_token', 'is_verified']);
        });
    }
};
