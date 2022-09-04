<?php

namespace App;

class Enum {
    public const DEFAULT_QUESTIONS_QUANTITY = 4;

    public const LANGUAGES = [
        'ru' => [
            'title' => 'русский',
            'icon' => '🇷🇺'
        ],
        'en' => [
            'title' => 'english',
            'icon' => '🇬🇧'
        ]
    ];

    public const CONTACT_METHODS = [
        'tlg' => 'TELEGRAM',
        'vk' => 'VK',
        'fb' => 'FACEBOOK',
        'email' => 'EMAIL',
    ];
}
