<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'music',
            'politics',
            'art',
            'books',
            'sport',
            'movies',
        ];

        foreach($categories as $category) {
            Category::create([
                'title' => $category,
                'weight' => rand(1, 10)
            ]);
        }
    }
}
