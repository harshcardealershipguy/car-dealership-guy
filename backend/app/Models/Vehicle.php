<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $casts = [
        'images' => 'array'
    ];

    protected $fillable = [
        'external_id',
        'user_id',
        'vin',
        'year',
        'make',
        'model',
        'mileage',
        'condition',
        'zip',
        'msrp',
        'price',
        'description',
        'images',
        'status'
    ];
}
