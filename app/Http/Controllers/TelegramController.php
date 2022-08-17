<?php

namespace App\Http\Controllers;

use App\Services\Telegram\CallbackService;
use App\Services\Telegram\MessageService;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;
use Telegram\Bot\Objects;

class TelegramController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $upd = Telegram::getWebhookUpdates();
        
        if ($upd instanceof Objects\Update) {
            
            switch($upd->objectType()) {
                case 'message': {
                    MessageService::process($msg);
                    break;
                }

                case 'callback_query': {
                    $callback = $upd->getCallbackQuery();
                    
                    if ($callback !== null) {
                        CallbackService::process($callback);
                    }
                    break;
                }
            }
            
        } else {
            Log::warning('Incorrect webhookUpdate type: ' . get_class($upd));
        }
    }
}
