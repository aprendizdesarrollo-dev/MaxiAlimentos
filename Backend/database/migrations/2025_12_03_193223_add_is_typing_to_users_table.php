<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            // Columna para saber si el usuario está escribiendo
            if (!Schema::hasColumn('users', 'is_typing')) {
                $table->boolean('is_typing')->default(false);
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'is_typing')) {
                $table->dropColumn('is_typing');
            }
        });
    }
};
