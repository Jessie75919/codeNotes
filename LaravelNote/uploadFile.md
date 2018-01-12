# Upload File

### With [Laravel-Collective Forms_Html](https://laravelcollective.com/docs/5.2/html) 

# File

```php
{!! Form::open([
	'method'=> 'POST',
	'action'=> 'PostController@store',
	'files' =>  true])
 !!}

    <div class="form-group">
        {!! Form::label('title','Picture') !!}
        {!! Form::file('file' ,['class'=>'form-control' ]) !!}
    </div>

```

* Fill the third parameter call `'Files' => true` in `Form::open()` method.

* use `Form::file('nameAtrribute' , ['class'=>'....'])`

Detect the html element , you will see `enctype="multipart/form-data"` in this following:

```php
<form method="POST" action="http://127.0.0.1:8000/posts" accept-charset="UTF-8" enctype="multipart/form-data">
```

`PostController`

### get Information of File
```php
public function store(PostRequest $request)
{
	$file = $request->file('nameAtrribute'); 
			        // get file with nameAtrribute
	echo $file->getClientOriginalName(); 
	echo $file->getClientSize();
}
```

### insert the File Name to DB & Move File to public folder

```php
public function store(PostRequest $request)
{
	// get all data from request
	$input = $request->all();

	// if it has file data
	if ($file = $request->file('file')) {
		// get the name of file 
		$name = $file->getClientOriginalName();

		// move the file to public\images folder and named it 
		$file->move('images', $name);
		
		// add the column `path` named the file's name
		$input['path'] = $name;
	}

	// insert into those data to DB
	Post::create($input);

```

### Display the image with accessor

`Post.php`

```php
class Post extends Model
{
	         // set the pathName             
	public $directory = "/images/";

	public function getPathAttribute($val)
	{							// $val (jc.jpg)
	
		
		$wholePath = $this->directory . $val;
		// $wholePath (images/jc.jpg)
		
		return 	$wholePath
	}
}
```

`index.blade.php`

```php
@foreach( $posts as $post)
	<div class="image-container">
		<img height="200" src="{{$post->path}}" alt="">
	</div>
@endforeach
```

