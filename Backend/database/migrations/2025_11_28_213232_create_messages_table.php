<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * Esta tabla almacena cada mensaje enviado entre dos usuarios,
     * ligado a una conversación.
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            // Conversación a la que pertenece el mensaje
            $table->unsignedBigInteger('conversation_id');

            // Usuario que envía y usuario que recibe
            $table->unsignedBigInteger('remitente_id');
            $table->unsignedBigInteger('destinatario_id');

            // Contenido del mensaje
            $table->text('mensaje');

            // Estado de lectura
            $table->boolean('leido')->default(false);
            $table->timestamp('read_at')->nullable();

            $table->timestamps();

            // Llaves foráneas
            $table->foreign('conversation_id')->references('id')->on('conversations')->onDelete('cascade');
            $table->foreign('remitente_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('destinatario_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
