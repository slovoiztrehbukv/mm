<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 16)->default('ru');
            $table->string('name')->nullable();
            $table->string('login')->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->unique()->nullable();
            $table->bigInteger('vk_id')->unique()->nullable();
            $table->string('instagram_id', 255)->unique()->nullable();
            $table->bigInteger('tlg_id')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('avatar', 512)->nullable();
            $table->string('password')->default('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
