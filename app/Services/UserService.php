<?php

namespace App\Services;

use App\Enum;
use App\Models\User;

class UserService {
    public static function getPreferedContactMethod(User $user)
    {
        if ($user->tlg_id) return ENUM::CONTACT_METHODS['tlg'];
        if ($user->vk_id) return ENUM::CONTACT_METHODS['vk'];
        if ($user->email) return ENUM::CONTACT_METHODS['email'];
    }
}