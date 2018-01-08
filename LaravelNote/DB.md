# Database

## [Raw DB Query] => 第二個參數是個陣列

寫進資料庫 [static] insert()

```php
DB::insert('insert into blogs (title, body ) value (?,?) ', [
			'PHP with laravel',
			'Laravel Learing....'
]);

```

讀取資料 [static] select()

```php
Route::get('/read',function() {
		$result = DB::select('select * from blogs where id=?', [1]);
		dd($result);
});

```

更新資料 [static] update()

```php
Route::get('/update',function() {
	    $update = DB::update('update blogs set title =? where id = ?',[
	    	'PHP', 1
	    ]);
	    return $update;
});

```

刪除資料 [static] delete()

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


#### [static] 從資料庫讀取全部的資料 all()

```php
    Route::get('/all',function() {
    		$posts = Post::all();
    		return $posts;

    });

```

#### [static] 從資料庫讀取特定的資料 find()

```php
    Route::get('/find/{id}',function($id) {
    		$posts = Post::find($id);
    		return $posts;
	 });
```

#### [static] 從資料庫讀取特定的資料 where() 分組groupBy() 限制幾筆 take() => 取出get()

```php
Route::get('/findwhere/{id?}',function($id = 1) {
                 //where 'user_id' = $id order by id limit 1
    $posts = Post::where('user_id',$id)->orderBy('id',"asc")->take(1)->get();
    return $posts;
});
```

#### [static] 取出特定資料，如果找不到的話會處理Excption的部分 findOrFail()

```php
Route::get('/findmore/{id?}',function($id) {
	$posts = Post::findOrFail($id);
	return $posts;
});

```

#### 寫入資料庫 save()
```php
Route::get('/basicInsert',function() {
	$post = new Post;
	$post->title = 'Behind the Scenes';
	$post->body = 'On Tuesday and Wednesday of this week, I traveled to Puerto .';
	$post->save();
});

```

#### 更新資料庫 find() + save()
```php
Route::get('/basicInsert',function() {
	$post = Post::find($id); // find the row which will be updated
	$post->title = 'This is Updated Title ';
	$post->body = 'This is Updated content. !!';
	$post->save();
});

```

#### [static] 多筆欄位寫入DB內 create(),參數為 array指定要寫入的欄位&值
```php
Route::get('/create',function() {
	Post::create([
		'title'=>'Behind the Scenes',
		'body'=>'On Tuesday and Wednesday of this week, I traveled to Puerto .'
	]);
});
```

##### 因為laravel因為安全性的問題，所以預設是無法多個欄位寫入資料，必須要在Model內用`$fiilable`明確指定哪些欄位是可以一次寫入的。

```php
class Post extends Model
{
	protected $fillable = ['title','body'];
}
```

#### [static] 更新DB的資料 update(),參數為 array指定要更新的欄位&值
```php
Route::get('/justUpdate', function () {
	Post::where('id', 2) -> update([
		'title' => 'This is update() title',
		'body'  => 'eloquent update() !!'
	]);
});
```

#### 刪除某筆特定資料 find() + delete()
```php
Route::get('/justDelete1', function () {
    $delPost = Post::find(6);
    $delPost->delete();
});
```
or

##### [static] destroy()


```php
Route::get('/justDelete2', function () {
	Post::destroy(5);
	// or
	Post::destroy([3, 4]); // 一次刪除好幾筆
});

```

## 使用軟刪除（Soft Delete）
軟刪除是表面上已經是刪除狀態，但是他還並未真正的從資料庫移除，他會在設定為軟刪除紀錄的欄位 `deleted_at` 增加一筆時間戳記。

#### 1. 使用migration新增對Post表格新增一個deleted_at的欄位
新增`add_deleted_at_column_to_posts_tables `的migration

```php
php artisan make:migration add_deleted_at_column_to_posts_tables --table=posts
```
`--table=` 指定要作用在那個表格

#### 2. 在Post Model 中設定soft Delete
```php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
	use SoftDeletes;
	protected $dates = ['deleted_at'];
}
```
 * 使用 laravel 定義的 `$dates` 並且給予欄位名稱叫做 `deleted_at`
 * 導入並且使用 SoftDeletes

#### 3. 在`AddDeletedAtColumnToPostsTables` 中設定
```php
class AddDeletedAtColumnToPostsTables extends Migration
{
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            // 使用softDeletes()
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
}

```

#### 4. migrate
```php
php artisan mirgate
```

#### 5. 一般的delete方法
```php
Route::get('/softdelete',function(){
		Post::find(2)->delete();
});
```
>> 會發現DB內的deleted_at內時間出現了(預設是null)

### [static] 取得被軟刪除的檔案 
* withTrashed() / onlyTrashed() 

```php
Route::get('/readSoftDelete',function(){
                                  // 針對某一筆被軟刪除的資料
		$delPost = Post::withTrashed()->where('id',2)->get();
		$delPost = Post::onlyTrashed()->where('id',2)->get();
		
		                // 取得所有被軟刪除的資料
		$delPost = Post::onlyTrashed()->get();
		
		return $delPost;
});

```

### 恢復資料到尚未軟刪除的狀態
* restore()

```php
Route::get('/restore',function(){
             // 找到被軟刪除的某筆資料              // 恢復
		Post::withTrashed()->where('user_id',1)->restore();
});
```

### 強制刪除某筆資料
* forceDelete()

```php
Route::get('/forceDelete',function(){
            // 找到被軟刪除的某筆資料         // 強制刪除
	    Post::withTrashed()->where('id',7)->forceDelete();
	});
```






















