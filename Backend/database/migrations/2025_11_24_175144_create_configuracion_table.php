<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
        public function up()
    {
        Schema::create('configuracion', function (Blueprint $table) {
            $table->id();

            // Configuración general
            $table->string('modo_mantenimiento')->default('off');  // on/off
            $table->string('tema')->default('claro');              // claro/oscuro/auto
            $table->string('mensaje_bienvenida')->nullable();

            // Colores del sistema
            $table->string('color_primario')->default('#397C3C');
            $table->string('color_secundario')->default('#5bad5c');

            // Footer
            $table->string('footer_texto')->default('MaxiAlimentos S.A.S © Todos los derechos reservados.');

            // Notificaciones
            $table->boolean('notificaciones_sonido')->default(true);
            $table->boolean('notificaciones_popup')->default(true);

            // Textos legales
            $table->longText('politica_privacidad')->nullable();
            $table->longText('terminos')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('configuracion');
    }
};
