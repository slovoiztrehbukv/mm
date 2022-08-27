<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(['meme', 'landscape'] as $imgType) {
            for($i = 1; $i <= 6; $i++) {
                Image::create([
                    'title' => "$imgType $i",
                    'path' => "answers/$imgType$i.png"
                ]);
            }
        }
    }
}
