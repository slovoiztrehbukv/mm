<?php

namespace App\Listeners;

use App\Enum;
use App\Events\MatchFound;
use App\Mail\MatchFound as MailMatchFound;
use App\Services\UserService;
use App\Services\NotificationService;

class NotifyWaitingUser
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(MatchFound $event)
    {
        $waitingUser = $event->answerWaiting->user;



        switch(UserService::getPreferedContactMethod($waitingUser)) {

            case ENUM::CONTACT_METHODS['tlg']: {

                NotificationService::sendTelegramMessage(
                    $waitingUser->tlg_id,
                    getMessageTpl('match_found__waiting', $event)
                );

                break;

            }

            case ENUM::CONTACT_METHODS['vk']: {

                NotificationService::sendVKMessage(
                    $waitingUser->vk_id,
                    "VK MESSAGE TEXT HERE"
                );

                break;

            }

            case ENUM::CONTACT_METHODS['email']: {

                NotificationService::sendEmail(
                    $waitingUser->email,
                    new MailMatchFound($event)
                );

                break;

            }

        }
    }
}
