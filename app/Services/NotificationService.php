<?php

namespace App\Services;

use App\Enum;
use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Services\Telegram\SendMessageService;

class NotificationService {
    /**
     * @param integer $tlgId
     * @param string $data
     * @return void
     */
    public static function sendTelegramMessage(int $tlgId, string $data)
    {
        SendMessageService::send($tlgId, $data);
    }

    /**
     * @param string $vkId
     * @param string $data
     * @return void
     */
    public static function sendVKMessage(string $vkId, string $data)
    {
        Log::info("VK MSG PSEUDO SENT TO $vkId: $data");
    }

    /**
     * @param string $email
     * @param Mailable $data
     * @return void
     */
    public static function sendEmail(string $email, Mailable $data)
    {
        Mail::to($email, $data);
    }
}