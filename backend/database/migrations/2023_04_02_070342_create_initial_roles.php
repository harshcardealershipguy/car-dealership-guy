<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $customer = Role::create([
            'name' => 'customer',
            'display_name' => 'Customer',
            'description' => 'User is a person looking to purchase a vehicle',
        ]);

        $dealer = Role::create([
            'name' => 'dealer',
            'display_name' => 'Dealer',
            'description' => 'User is a person selling vehicles',
        ]);

        $admin = Role::create([
            'name' => 'admin',
            'display_name' => 'Admin',
            'description' => 'User is an administrator of the website',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
