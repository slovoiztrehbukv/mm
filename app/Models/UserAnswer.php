<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Despite the fact that the class is named in the singular,
 * it is assumed that one instance is a set of answers to a batch of questions
 */
class UserAnswer extends Model
{
    use HasFactory;


    protected $fillable = [
        'batch_id',
        'user_id',
        'answers_quantity',
        'answers_ids',
    ];

    protected $casts = [
        'answers_ids' => 'array'
    ];
}
