<?php

namespace App\Http\Controllers;

use App\Services\Telegram\CallbackService;
use App\Services\Telegram\MessageService;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Laravel\Facades\Telegram;

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
        
        if ($upd instanceof \Telegram\Bot\Objects\Update) {
            
            $msg = $upd->getMessage();
            
            if ($msg !== null){
                MessageService::process($msg);
            } else {
                $callback = $upd->getCallbackQuery();
                // Log::info('callback is here');
                if ($callback !== null) {
                    CallbackService::process($callback);
                }
            }
            
        } else {
            Log::warning('Incorrect webhookUpdate type: ' . get_class($upd));
        }
    }
}
