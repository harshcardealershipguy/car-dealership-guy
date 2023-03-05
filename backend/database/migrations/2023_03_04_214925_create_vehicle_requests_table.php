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
        Schema::create('vehicle_requests', function (Blueprint $table) {
            $table->id();
            $table->uuid('external_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');

            $table->boolean('exact_vehicle_known');
            $table->enum('new_or_used', ['new', 'used', 'new_or_used'])->nullable();
            $table->string('engine_type')->nullable();

            $table->string('year_low')->nullable();
            $table->string('year_high')->nullable();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->string('trim')->nullable();
            $table->jsonb('exterior_colors')->nullable();
            $table->jsonb('interior_colors')->nullable();
            $table->jsonb('features')->nullable();

            $table->string('body_style')->nullable();
            $table->string('size')->nullable();
            $table->jsonb('makes')->nullable();
            $table->jsonb('exclude_makes')->nullable();
            $table->jsonb('important_features')->nullable();

            $table->string('timeframe')->nullable();
            $table->enum('payment_method', ['cash', 'financing'])->nullable();
            $table->integer('budget_or_monthly_payment')->nullable();
            $table->enum('credit_score', ['300-579', '580-669', '670-739', '740-799', '800-850'])->nullable();
            $table->integer('money_down')->nullable();

            $table->string('trade_in_year')->nullable();
            $table->string('trade_in_make')->nullable();
            $table->string('trade_in_model')->nullable();
            $table->string('trade_in_trim')->nullable();
            $table->string('trade_in_mileage')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_requests');
    }
};
