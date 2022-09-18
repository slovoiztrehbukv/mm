<?php

namespace App\Jobs;

use App\Models\Match;
use App\Events\MatchFound;
use App\Models\UserAnswer;
use App\Models\UsersMatch;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Log;

class FindMatch implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var UserAnswer
     */
    private UserAnswer $userAnswer;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(UserAnswer $userAnswer)
    {
        $this->userAnswer = $userAnswer;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // TODO ALGORITHM TO SERVICE
        $answersMatches = [];

        $potentialUserAnswers = UserAnswer::query()
            ->where(
                'answers_quantity',
                '=',
                $this->userAnswer->answers_quantity
            )
            ->where('batch_id', '=', $this->userAnswer->batch_id)
            ->where('id', '!=', $this->userAnswer->id)
            ->where('user_id', '!=', $this->userAnswer->user->id)
            ->whereNotIn(
                'user_id',
                $this->userAnswer->user->usersWereFound->pluck('id')->toArray()
            )
            ->whereNotIn(
                'user_id',
                $this->userAnswer->user->usersDidFound->pluck('id')->toArray()
            )
            ->get();

        $currentAnswers = $this->userAnswer->answers_ids;
        $targetAnswers = $potentialUserAnswers
            ->mapWithKeys(function ($targetUA) {
                return [$targetUA->id => $targetUA->answers_ids];
            })
            ->toArray();

        foreach ($targetAnswers as $id => $answers) {
            $answersMatches[$id] = count(
                array_intersect($answers, $currentAnswers)
            );
        }

        arsort($answersMatches);

        $bestPotentialMatchId = array_key_first($answersMatches);

        if ($bestPotentialMatchId) {
            $accuracy =
                ((int) $answersMatches[$bestPotentialMatchId]) /
                ((int) $this->userAnswer->answers_quantity); // ??? TODO FIXME
            $accuracy = round(100 * $accuracy);

            if (!$accuracy) {
                return;
            }

            try {
                UsersMatch::create([
                    'user_was_found_id' => $this->userAnswer->user->id,
                    'user_did_found_id' => UserAnswer::find(
                        (int) $bestPotentialMatchId
                    )->user->id,
                    'accuracy' => $accuracy,
                ]);
            } catch (\Throwable $e) {
                Log::warning(
                    'mm.app.Jobs.FindMatch.handle.warning > cannot create UsersMatch: ' .
                        $e->getMessage(),
                    (array) $this
                );
            }
        }
    }
}
