<?php

namespace App\GraphQL\Queries;

use App\Models\Batch;
use App\Models\Question;
use App\Http\Resources\QuestionResource;

final class GetQuestionsResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $batch = Batch::where('title', 'like', '%Soulmating%')
            ->firstWhere('questions_quantity', $args['questionsQuantity']);

        $batch = $batch ?? Batch::firstWhere('questions_quantity', 2);
        $batch->questions->map(function(Question $question) use ($args){
            $count = $question->answers->count();
            $take = $args['answersQuantity'] <= $count ? $args['answersQuantity'] : $count;
            $take = min($take, 6);

            $question->answers = $question->answers->random($take);
            return $question;
        });

        return QuestionResource::collection($batch->questions);
    }
}
