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
    Schema::table('notificaciones', function (Blueprint $table) {
        $table->unsignedBigInteger('relacion_id')->nullable()->after('tipo');
    });
}

public function down()
{
    Schema::table('notificaciones', function (Blueprint $table) {
        $table->dropColumn('relacion_id');
    });
}
 
};
