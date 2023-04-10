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
         Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->dropColumn('city');
            $table->dropColumn('state');
        });

        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->string('zip')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->string('city')->nullable();
            $table->string('state')->nullable();
        });

        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->dropColumn('zip');
        });
    }
};
