#Auth



~~~php
laravel new expamle --dev

php artisan make:auth
~~~

## routes / web.php 
~~~php
auth:route();
~~~

## HomeController
~~~php
    public function __construct()
    {
        $this->middleware('auth'); 
            // 每個請求都會經過這個叫做 『auth』 middleware
            
        $this->middleware('auth', ['only' => 'index ']);
            // 只有在index會經過這個middleware
            
        $this->middleware('auth', ['except' => 'index ']);
            // 除了index其他都會經過這個middleware
    }
~~~


### 所有的middleware都在

    /Users/vm/Desktop/code/Auth/app/Http/Kernel.php

## 選擇sqlite DB
**.env** =>

DB_CONNECTION = sqlite

cd **database** create **database.sqlite**

~~~php
    php artisan migrate
~~~


## 切換maintaince模式

~~~php
    php artisan down => 進入維護模式
    
    php artisan up => 進入上線模式
~~~







