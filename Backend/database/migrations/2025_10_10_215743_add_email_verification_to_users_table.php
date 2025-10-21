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
            // Solo crea la columna si NO existe
            if (!Schema::hasColumn('users', 'verification_token')) {
                $table->string('verification_token', 100)->nullable()->after('rol');
                $table->index('verification_token');
            }

            // Solo crea la columna si NO existe
            if (!Schema::hasColumn('users', 'is_verified')) {
                $table->boolean('is_verified')->default(false)->after('verification_token');
            }
        });
    }

    /**
     * Reversa los cambios por si hay que volver atrás.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Elimina el índice si existe
            if (Schema::hasColumn('users', 'verification_token')) {
                $table->dropIndex(['verification_token']);
                $table->dropColumn('verification_token');
            }

            // Elimina la columna is_verified si existe
            if (Schema::hasColumn('users', 'is_verified')) {
                $table->dropColumn('is_verified');
            }
        });
    }
};
