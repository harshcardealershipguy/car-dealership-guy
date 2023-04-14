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
        Schema::table('messages', function (Blueprint $table) {
            $table->renameColumn('from_user_id', 'from_user_external_id');
            $table->renameColumn('to_user_id', 'to_user_external_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->renameColumn('from_user_external_id', 'from_user_id');
            $table->renameColumn('to_user_external_id', 'to_user_id');

        });
    }
};
