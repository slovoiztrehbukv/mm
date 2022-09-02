<?php

namespace App\GraphQL\Queries;

use App\Models\Batch;
use App\Models\Question;
use App\Http\Resources\BatchResource;
use App\Models\Answer;

final class GetBatchResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $batch = Batch::where('category_id', '=', $args['categoryId'] ?: null)
            ->firstWhere('questions_quantity', $args['questionsQuantity']);

        $batch = $batch ?? Batch::firstWhere('questions_quantity', 2);
        $batch->questions->map(function(Question $question) use ($args){
            $count = $question->answers->count();
            $take = $args['answersQuantity'] <= $count ? $args['answersQuantity'] : $count;
            $take = min($take, 6);

            $question->answers = $question->answers->take($take)->shuffle();

            $question->answers->map(function(Answer $answer) use ($question){
                if (!$answer->image) return;

                $answer->image->url = $question->type === 'IMAGE' ? $answer->image->url() : null;

                return $answer;
            });

            return $question;
        });

        return new BatchResource($batch);
    }
}
