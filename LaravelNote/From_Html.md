# Laravel Collective [Forms & HTML] & Validate

-----
# Forms & HTML

#### How to Install  =>  [Laravel Collective](https://laravelcollective.com/docs/master/html)


> Controller = C


#### Form::model ( bind-model , ['method'=>'__' ,'action'=> [ '直接指定某個C的方法' , 要帶去C的參數 ]] )


```php

// Update
{!! Form::model( $post , ['method'=>'PATCH', 'action'=> ['PostController@update', $post->id ]]) !!}
<div class="form-group">
	{!! Form::label('title'   ,  'The Post Title') !!}
	{!! Form::text ('title'   ,   null ,['class'=>'form-control' ]) !!}
	{!! Form::text ('body'    ,   null ,['class'=>'form-control' ]) !!}
	{!! Form::text ('user_id' ,   null ,['class'=>'form-control' ]) !!}
</div>
<div class="form-group">
	{!! Form::submit('Update Post', ['class'=>'btn btn-primary' ]) !!}
</div>
{!! Form::close() !!}

// Delete
{!! Form::open(['method'=>'DELETE' , 'action'=> ['PostController@destroy', $post->id ]]) !!}
	{!! Form::submit('Delete Post', ['class'=>'btn btn-danger']) !!}
{!! Form::close() !!}

```

# Validation

```php
public function store(Request $request)
{
	$this->validate( $request, [
		'title'   => 'required',
		'body'    => 'required',
		'user_id' => 'required'
	]);
	
	Post::create($request->all());
	return redirect('/posts/create');
}
```

> [更多Validation Rules](https://laravel.com/docs/5.2/validation#available-validation-rules)

## PostRequest class

將某個常用的Request包裝成一個Class，並且把validation Rules統一寫在裡面

```php
php artisan make:request PostRequest
```

`PostRequest.php`

```php
class PostRequest extends FormRequest
{
    public function authorize()
    {
        return false;
    }

    public function rules()
    {
        return [
	        'title'   => 'required',
	        'body'    => 'required',
	        'user_id' => 'required'
        ];
    }
}
```

在 `PostController ` 的 `store` 方法之中把 `request`參數的型態改成我們自己創建的`PostRequest`

```php
public function store(PostRequest $request)
{
	/*
		$this->validate( $request, [
			'title'   => 'required',
			'body'    => 'required',
			'user_id' => 'required'
		]);
	*/

	Post::create($request->all());
	return redirect('/posts/create');
}
```
- - -

#####  顯示錯誤訊息

在 `route.php` 設定 `『 web 』` `middleware`，要經過/posts的路徑的都會先通過這層 `Web middleware`

```php
Route::group(['middleware' => 'web'], function () {
	Route::resource('/posts', 'PostController');
});
```

在表格底下設置如果有錯誤變數 `errors` 顯示出來

```php
@if(count($errors) > 0)
	<div class="alert alert-danger">
		<ul>
			@foreach( $errors->all() as $error )
				<li>{{$error}}</li>
			@endforeach
		</ul>
	</div>
@endif
```


