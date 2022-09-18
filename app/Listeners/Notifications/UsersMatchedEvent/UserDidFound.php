<?php

namespace App\Listeners\Notifications\UsersMatchedEvent;

use App\Enum;
use App\Events\UsersMatched;
use App\Services\UserService;
use Illuminate\Support\Facades\Log;
use App\Services\NotificationService;
use App\Mail\UsersMatched as MailUsersMatched;

/**
 * Notify User that did found
 */
class UserDidFound
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
    public function handle(UsersMatched $event)
    {
        switch (UserService::getPreferedContactMethod($event->userDidFound)) {
            case ENUM::CONTACT_METHODS['tlg']:
                NotificationService::sendTelegramMessage(
                    $event->userDidFound->tlg_id,
                    getMessageTpl('users_matched__user_did_found', [
                        'event' => $event,
                    ])
                );

                break;

            case ENUM::CONTACT_METHODS['vk']:
                NotificationService::sendVKMessage(
                    $event->userDidFound->vk_id,
                    'VK MESSAGE TEXT HERE'
                );

                break;

            case ENUM::CONTACT_METHODS['email']:
                NotificationService::sendEmail(
                    $event->userDidFound->email,
                    new MailUsersMatched($event)
                );

                break;
        }
    }
}
