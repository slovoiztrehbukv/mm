<?php

namespace App\Services\Telegram;

use Telegram\Bot\Api;
use Telegram\Bot\Objects\Message;

class APIService extends Api {
    public function deleteMessage(array $params)
    {
        $response = $this->post('deleteMessage', $params);

        return new Message($response->getDecodedBody());
    }
}