<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersMatch extends Model
{
    use HasFactory;



    protected $fillable = [
        'user_was_found_id',
        'user_did_found_id',
        'accuracy',
    ];
}
