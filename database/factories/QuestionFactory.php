<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\Answer;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['TEXT', 'IMAGE'];

        return [
            'title' => ucfirst("{$this->faker->word} {$this->faker->word} {$this->faker->word}?"),
            'type' => $types[array_rand($types)],
            'is_published' => rand(0, 1),
            'is_moderating' => rand(0, 1)
        ];
    }

    public function answers(int $count = 6)
    {
        $imgs = Image::all();
        
        return $this->afterCreating(function(Question $question) use ($count, $imgs){

            if ($question->type === 'TEXT') {
                for ($i = 0; $i < $count; $i++) {
                    Answer::create([
                        'question_id' => $question->id,
                        'value' => $this->faker->word
                    ]);
                }
            } elseif ($question->type === 'IMAGE') {
                $targetType = rand(0,1) ? 'meme' : 'landscape';

                for ($i = 0; $i < $count; $i++) {
                    $index = $i + 1;
                    $index = (string)$index;
                    Answer::create([
                        'question_id' => $question->id,
                        'value' => $imgs->firstWhere('title', '=', "$targetType $index")->id
                    ]);
                }
            }

        });
    }

    public function toCategories()
    {
        $categories = Category::all();

        return $this->state(function() use ($categories){
            return [
                'category_id' => $categories->random()->id
            ];
        });
    }
}
