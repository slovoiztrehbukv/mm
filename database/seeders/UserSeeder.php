<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'login' => 'admin',
            'password' => Hash::make('password')
        ]);

        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'login' => "user$i",
                'password' => Hash::make("password$i")
            ]);
        }
    }
}
