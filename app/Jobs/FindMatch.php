<?php

namespace App\Jobs;

use App\Events\MatchFound;
use App\Models\UserAnswer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

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
            ->where('answers_quantity', '=', $this->userAnswer->answers_quantity)
            ->where('batch_id', '=', $this->userAnswer->batch_id)
            ->where('id', '!=', $this->userAnswer->id)
            ->get();

        $currentAnswers = $this->userAnswer->answers_ids;
        $targetAnswers = $potentialUserAnswers
            ->mapWithKeys(function($targetUA){
                return [$targetUA->id => $targetUA->answers_ids];
            })
            ->toArray();



        foreach($targetAnswers as $id => $answers) {
            $answersMatches[$id] = count(array_intersect($answers, $currentAnswers));
        }



        arsort($answersMatches);



        $bestPotentialMatchId = array_key_first($answersMatches);

        $accuracy = ((int) $answersMatches[$bestPotentialMatchId]) / ((int) $this->userAnswer->answers_quantity);
        $accuracy = round(100 * $accuracy);



        if ($bestPotentialMatchId) {
            MatchFound::dispatch([
                'answerLatest' => $this->userAnswer,
                'answerWaited' => UserAnswer::find((int)$bestPotentialMatchId),
                'accuracy' => $accuracy
            ]);
        }
    }
}
