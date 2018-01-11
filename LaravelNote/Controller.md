# Controller

```php
php artisan make:controller PostControler -r
```

`-r` => Resource : 幫你把常用的方法都建構出來

`PostController.php`

```php
class PostController extends Controller
{
    public function index(){}

    public function create(){}

    public function store(Request $request){}

    public function show($id){}

    public function edit($id){}

    public function update(Request $request, $id){}

    public function destroy($id){}
}
```



在 `Route.php` 只要使用 ` resource ` 方法，就會幫你把PostController所有方法相對應的路徑設定好

```php
Route::resource('/posts', 'PostController');

```

檢視目前所有路徑 => 察看所以路徑相對應的方法名稱

```php
php artisan route:list 
|GET |posts|posts.index|App\Http\Controllers\PostController@index
|POST|posts|posts.store|App\Http\Controllers\PostController@store

```

## 寫入資料
```
POST      | posts| posts.store   | App\Http\Controllers\PostController@store
```

準備一個Master.view

`master.blade.php`

```php
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css.master.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        @yield('content')
    </div>
    @yield('footer')
</body>
</html>
```

再準備一個create view

`create.blade.php`

```php
@extends('layouts.master')

@section('content')

	      // 依據action與method的設定，代表會送到PostController的store方法 => 由route:list可以察看
    <form action="/posts" method="post">
        {{csrf_field()}}
        <input type="text" name="title" placeholder="title">
        <input type="text" name="body" placeholder="body">
        <input type="text" name="user_id">

        <input type="submit" name="submit">
    </form>
@endsection
@yield('footer')
```

`PostController@store`

```php
public function store(Request $request)
{
    $request->all();
	// 取得request所有資料
	$request->get('title');
	// 取得request特定資料
	$request->abc;
	// 取得request內name＝abc的資料，把他視為屬性
	Post::create($request->all());
	// 把資料全部寫進資料庫(input裡面的name需要和DB裡面的欄位命名相同)

	
}

```

## 讀取資料庫資料 ＆ 顯示在view上
##### 顯示所有資料

```
GET|HEAD  | posts| posts.index   | App\Http\Controllers\PostController@index
```

`PostController@index`

```php
 public function index()
{
	$posts =  Post::all();
	return view('posts.index', compact('posts'));
}
```



`\posts\index.blade.php`

```php
@extends('layouts.app')
@section('content')
    @foreach( $posts as $post)
        <div>
            <h1>{{$post->title}}</h1>
            <p>{{$post->body}}</p>
            <hr>
        </div>
    @endforeach
@endsection
```

- - -


##### 顯示特定單筆資料
```
GET|HEAD  | posts/{post}| posts.show    | App\Http\Controllers\PostController@show
```

`PostController@show`

```php
public function show($id)
{
	$post = Post::findOrFail($id);
	return view('posts.show',compact('post'));
}
```

`\posts\index.blade.php` 設定帶著 `post id` 連結到 `show.blade.php`

```php
@extends('layouts.app')
@section('content')
@foreach( $posts as $post)
	<div>
		 <h1><a href="/posts/{{$post->id}}">{{$post->title}}</a></h1>
		 // or
		 
		 // 利用 route( 要去PostController的哪一個方法 , 要帶的id ) 方法指定路徑
		 <h1><a href="{{route('posts.show', $post->id)}}">{{$post->title}}</a></h1>

		<p>{{$post->body}}</p>
		<hr>
	</div>
@endforeach
@endsection
```

`\posts\show.blade.php`

```php
@extends('layouts.app')
@section('content')
    <div>
        <h1>{{$post->title}}</h1>
        <p>{{$post->body}}</p>
        <hr>
    </div>
@endsection
```

## 更新資料

```
PUT|PATCH | posts/{post}| posts.update  | App\Http\Controllers\PostController@update
```

`\post\edit.blade.php`

```php
@extends('layouts.app')
@section('content')
    <h1> Edit Post</h1>
    <form action="/posts/{{$post->id}}" method="post">
		// 設定 Token
        {{csrf_field()}}
		// 用一個隱藏的input設定 這是一個Put方法
        <input type="hidden" name="_method" value="PUT">
        <input type="text" name="title" placeholder="title" value="{{$post->title}}">
        <input type="text" name="body" placeholder="body" value="{{$post->body}}">
        <input type="text" name="user_id" value="{{$post->user_id}}">
        <input type="submit" name="submit">
    </form>
@endsection
```

設定在 `show.blade.php` 連結帶到 `edit.blade.php`

```php
@extends('layouts.app')
@section('content')
    <div>
        <h1><a href="{{route('posts.edit',$post->id)}}">{{$post->title}}</a></h1>
        <p>{{$post->body}}</p>
        <hr>
    </div>
@endsection

```

`PostController@update`

```php
public function update(Request $request, $id)
{
	$post = Post::findOrFail($id);
	$post->update($request->all());
}
```

## 刪除資料

```php
 <form action="/posts/{{$post->id}}" method="post">
	{{csrf_field()}}
								// 設定使用Delete方法
	<input type="hidden" name="_method" value="DELETE">
	<input type="submit" value="Delete">
</form>

```

`PostController@destroy`

```php
public function destroy($id)
{
	$post = Post::findOrFail($id);
	$post->delete();
	return redirect('/posts');
}
```







