<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'external_id',
        'user_id',
        'exact_vehicle_known',
        'new_or_used',
        'engine_type',
        'year_low',
        'year_high',
        'make',
        'model',
        'trim',
        'exterior_colors',
        'interior_colors',
        'features',
        'body_style',
        'size',
        'makes',
        'exclude_makes',
        'important_features',
        'timeframe',
        'payment_method',
        'budget_or_monthly_payment',
        'credit_score',
        'money_down',
        'trade_in_year',
        'trade_in_make',
        'trade_in_model',
        'trade_in_trim',
        'trade_in_mileage'
    ];
}
