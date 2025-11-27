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
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();

            // Título de la notificación
            $table->string('titulo');

            // Mensaje o descripción extendida
            $table->text('mensaje')->nullable();

            // Tipo de notificación (comunicado, evento, beneficio, empleado, etc)
            $table->string('tipo')->default('general');

            // Estado de lectura
            $table->boolean('leida')->default(false);

            // Usuario destinatario (null = para todos)
            $table->unsignedBigInteger('user_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
