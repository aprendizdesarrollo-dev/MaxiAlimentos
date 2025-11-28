<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * Esta tabla representa una conversación entre 2 usuarios.
     * Solo debe existir UNA fila por cada par de usuarios.
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();

            // user1 y user2 son los participantes de la conversación
            $table->unsignedBigInteger('user1_id');
            $table->unsignedBigInteger('user2_id');

            // Último mensaje de la conversación (para mostrar preview en el inbox)
            $table->text('last_message')->nullable();

            // Fecha del último mensaje (para ordenar las conversaciones)
            $table->timestamp('last_message_at')->nullable();

            // Contadores de mensajes no leídos para cada usuario
            $table->unsignedInteger('unread_count_user1')->default(0);
            $table->unsignedInteger('unread_count_user2')->default(0);

            $table->timestamps();

            // Llaves foráneas
            $table->foreign('user1_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user2_id')->references('id')->on('users')->onDelete('cascade');

            // Evitar que se repita la misma combinación de usuarios
            $table->unique(['user1_id', 'user2_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('conversations');
    }
}
