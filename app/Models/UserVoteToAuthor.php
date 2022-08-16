<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class UserVoteToAuthor extends Model
{
    protected $table = 'user_votes_to_authors';



    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
