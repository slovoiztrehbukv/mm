<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'login',
        'email',
        'password',
        'tlg_id',
        'vk_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];



    public function votesForAuthors()
    {
        return $this->hasMany(UserVoteToAuthor::class);
    }

	/**
	 * Пользователи, НАЙДЕННЫЕ текущим пользователем
	 *
	 * @return HasManyThrough
	 */
    public function usersWereFound(): HasManyThrough
    {
        return $this->hasManyThrough(
			User::class,
			UsersMatch::class,
			'user_did_found_id',
			'id',
			'id',
			'user_was_found_id',
		);
    }

	/**
	 * Пользователи, НАШЕДШИЕ текущего пользователя
	 *
	 * @return HasManyThrough
	 */
	public function usersDidFound(): HasManyThrough
    {
        return $this->hasManyThrough(
			User::class,
			UsersMatch::class,
			'user_was_found_id',
			'id',
			'id',
			'user_did_found_id',
		);
    }



    public function isAdmin()
    {
        return in_array($this->login, ['admin']);
    }
}
