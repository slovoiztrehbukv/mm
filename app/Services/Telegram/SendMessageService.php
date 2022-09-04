<?php

namespace App\Services\Telegram;

use Telegram\Bot\Laravel\Facades\Telegram;

class SendMessageService
{
    public static function send(int $tlgUserId, string $message)
    {
        Telegram::sendMessage([
            'chat_id' => $tlgUserId,
            'parse_mode' => 'html',
            'text' => $message
        ]);
    }
}
