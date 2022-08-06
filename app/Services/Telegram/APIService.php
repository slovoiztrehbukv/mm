<?php

namespace App\Services\Telegram;

use Telegram\Bot\Api;
use Telegram\Bot\Objects\Message;
use Telegram\Bot\Objects\Update;
use Telegram\Bot\Objects\User;

class APIService extends Api {
    public function deleteMessage(array $params)
    {
        $response = $this->post('deleteMessage', $params);

        return new Message($response->getDecodedBody());
    }
}