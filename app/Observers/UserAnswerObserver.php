<?php

namespace App\Observers;

use App\Events\UserPassedSurvey;
use App\Models\UserAnswer;
use Illuminate\Support\Str;

class UserAnswerObserver
{
    public function creating(UserAnswer $userAnswer)
    {
        //
    }



    /**
     * Handle the UserAnswer "created" event.
     *
     * @param  \App\Models\UserAnswer  $userAnswer
     * @return void
     */
    public function created(UserAnswer $userAnswer)
    {
        event(new UserPassedSurvey($userAnswer));
    }

    /**
     * Handle the UserAnswer "updated" event.
     *
     * @param  \App\Models\UserAnswer  $userAnswer
     * @return void
     */
    public function updated(UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Handle the UserAnswer "deleted" event.
     *
     * @param  \App\Models\UserAnswer  $userAnswer
     * @return void
     */
    public function deleted(UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Handle the UserAnswer "restored" event.
     *
     * @param  \App\Models\UserAnswer  $userAnswer
     * @return void
     */
    public function restored(UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Handle the UserAnswer "force deleted" event.
     *
     * @param  \App\Models\UserAnswer  $userAnswer
     * @return void
     */
    public function forceDeleted(UserAnswer $userAnswer)
    {
        //
    }
}
