# Seeder

快速的在資料庫內產生一堆假資料做測試用。

```php
php artisan make:seeder PostTableSeeder

```

在 `/database/seeds/PostTableSeeder.php` 設定 `Post` 表格要產生的資料

```php
class PostTableSeeder extends Seeder
{
    public function run()
    {
        // 設定隨機資料
        $faker = Faker\Factory::create('zh_TW');
        
        foreach (range(0,20) as $number)
        {
	        \App\Post::create([
				    'title'   => $faker->sentence,
					'body'    => $faker->sentence(),
					'user_id' => rand(0, 100),
			 ]);
        }
    }
}

```

在 `database/seeds/DatabaseSeeder.php` 內設定

```php
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model as Model;

class DatabaseSeeder extends Seeder
	{
		public function run()
		{
			Model::unguard();
			$this->call(PostTableSeeder::class);
			// $this->call(BlogTableSeeder::class);
			Model::reguard();
		}
	}

```

then

```php
php artisan db:seed   
```

## 使用MODEL FACTORY的方法

在 `database/factories` 的資料夾中產生一個 `userFactory.php`

定義好要生成假資料的內容

```php
use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
        'country_id' => rand(1, 10)
    ];
});

```

在 `database/seeds/UserTableSeeder.php`

```php
class UserTableSeeder extends Seeder
{
    public function run()
    {
	    factory(\App\User::class, 30)->create();
	    // 指定要生成的Model ＆ 筆數
    }
}
```



在 `database/seeds/DatabaseSeeder.php` 內設定

```php
<?php

	use App\Post;
	use Illuminate\Database\Seeder;
	use Illuminate\Database\Eloquent\Model as Model;


	class DatabaseSeeder extends Seeder
	{
			public function run()
		{
			Model::unguard();
			$this->call(UserTableSeeder::class);
			Model::reguard();
		}
	}
```

then

```php
php artisan db:seed   
```