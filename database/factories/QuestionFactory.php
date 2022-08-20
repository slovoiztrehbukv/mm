<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Collection;

class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => ucfirst("{$this->faker->word} {$this->faker->word} {$this->faker->word}?"),
            'is_published' => rand(0, 1),
            'is_moderating' => rand(0, 1)
        ];
    }

    public function answers(int $count = 6)
    {
        return $this->afterCreating(function(Question $question) use ($count){
            for ($i = 0; $i < $count; $i++) {
                Answer::create([
                    'question_id' => $question->id,
                    'value' => $this->faker->word
                ]);
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
