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
                $table->string('budget_or_monthly_payment')->nullable()->change();
                $table->string('money_down')->nullable()->change();
                $table->string('credit_score')->nullable()->change();
            });

            DB::statement('ALTER TABLE vehicle_requests drop constraint vehicle_requests_credit_score_check');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehicle_requests', function (Blueprint $table) {
            $table->integer('budget_or_monthly_payment')->nullable()->change();
        });
    }
};
