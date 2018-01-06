# Database

## [Raw DB Query]

寫進資料庫 => 第二個參數是個陣列

```php
DB::insert('insert into blogs (title, body ) value (?,?) ', [
			'PHP with laravel',
			'Laravel Learing....'
]);

```

讀取資料 => 第二個參數是個陣列

```php
Route::get('/read',function() {
		$result = DB::select('select * from blogs where id=?', [1]);
		dd($result);
});

```

更新資料

```php
Route::get('/update',function() {
	    $update = DB::update('update blogs set title =? where id = ?',[
	    	'PHP', 1
	    ]);
	    return $update;
});

```

刪除資料

```php
Route::get('/delete',function() {
		$delete = DB::delete('delete from blogs where id = ? ',[1]);
		return $delete;
});

```

## [Eloquent]

#### Model

```php
php artisan make:model Post   -m
                      (name) (migration)
```

> 如果Model命名為**`Post`**，那Mysql的預設Table的命名就要為 `post` ＋ **`s`**

不然就要額外在`Post`內自己定義

```php
    protected $table = 'postGG';
```

在`Post`內自訂`post_id`欄位為`Primary Key`，預設Primary Key欄位命名為`id`

```php
    protected $primaryKey = 'post_id';
```

#### CreateBlogsTable migration make

```
    php artisan make:migration CreateBlogsTable
```
#### CreateBlogsTable

```php
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
	        $table->string('body');
            $table->timestamps();
        });
    }

```


#### 從資料庫讀取全部的資料（all）

```php
    Route::get('/all',function() {
    		$posts = Post::all();
    		return $posts;
    
    });

```

#### 從資料庫讀取特定的資料（find）

```php
    Route::get('/find/{id}',function($id) {
    		$posts = Post::find($id);
    		return $posts;
	 });
```

#### 從資料庫讀取特定的資料(where) 分組(groupBy) 限制幾筆(take) => 取出(get)

```php
Route::get('/findwhere/{id?}',function($id = 1) {
                 //where 'user_id' = $id order by id limit 1 
    $posts = Post::where('user_id',$id)->orderBy('id',"asc")->take(1)->get();
    return $posts;
});
```







