<?php

namespace App\Providers;

use App\Events\MatchFound;
use Throwable;
use App\Models\UserAnswer;
use App\Events\UserPassedSurvey;
use App\Jobs\FindMatch;
use App\Listeners\NotifyAnsweredUser;
use App\Listeners\NotifyWaitingUser;
use Illuminate\Support\Facades\Log;
use App\Observers\UserAnswerObserver;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use function Illuminate\Events\queueable;
use SocialiteProviders\Manager\SocialiteWasCalled;
use SocialiteProviders\VKontakte\VKontakteExtendSocialite;

use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        
        SocialiteWasCalled::class => [
            VKontakteExtendSocialite::class.'@handle',
        ],

        MatchFound::class => [
            NotifyWaitingUser::class,
            NotifyAnsweredUser::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        UserAnswer::observe(UserAnswerObserver::class);

        Event::listen(queueable(function(UserPassedSurvey $event){
            FindMatch::dispatch($event->getUserAnswer());
        })
            ->catch(function(UserPassedSurvey $event, Throwable $e){
                //
            }));
    }
}
