
在tinker內新增一筆User資料

~~~php
    php artisan tinker
    $user = new App\User;
    $user->name = 'JC';
    $user->email = 'jc@gmail.com';
    $user->password = bcrypt('a12334');
                     /* 加密 */
    $user->save();
~~~

修改CreateCommentsTable的內容，並且更新到DB（**DB的資料都會被刪除**）

~~~php
    php artisan migrate:refresh
~~~

設定**Comment**與**Post**的關係


**Comment**

~~~php
    class Comment extends Model
    {
        
    	public function post()
    	{
    		return $this->belongsTo(Post::class);
    	}
    
    	public function user()
    	{
    		return $this->belongsTo(User::class);
    	}
    }
~~~


**Post**

~~~php
    class Post extends Model
    {
        public function index()
        {
        	$posts = Post::latest() -> get();
        	$archives = Post::selectRaw('year(created_at) as year , monthname(created_at) as month ,count(*) as published')
				->groupBy('year', 'month')
				->get()
				->toArray();
        
        	return view('posts.index',compact('posts','archives'));
        }
    
		public function comments()
		{
			return $this->hasMany(Comment::class);
		}

		public function user()
		{
			return $this->belongsTo(User::class);
		}
	}
~~~

## Route
~~~php
Route::get('/','PostController@index')->name('home');
Route::get('/register','RegistrationController@create');
Route::post('/register','RegistrationController@store');

~~~


## View
~~~php
@extends('layout.master')

@section('content')

    <div class="col-sm-8">
        <h1>register</h1>

        <form action="/register" method="post">
            {{csrf_field()}}

            <div class="form-group">
                <label for="name">Name : </label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="email">Email : </label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>

            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>

            <div class="form-group">
                <label for="password">Password Confirmation: </label>
                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" required>
            </div>


            <div class="form-group">
               <button type="submit" class="btn btn-primary">Register</button>
            </div>

        </form>

        @include('components.error')

    </div>

@endsection

~~~


## Controller

~~~php
public function store()
{
	// validate the input
	$this->validate(\request(),[
        'name'     => 'required',
        'email'    => 'required|email',
        'password' => 'required|confirmed' 
                      // needs to match password input
	]);
    
	// create and save the user
	$user =  User::create(\request(['name','email','password']));
	
	// sign them in
	auth()->login($user);
	
	// redirect to home page
	return redirect()->home(); 
	                // 要先在route設定好 ->name('home');
}
~~~


## Header View
~~~php
<header>
    <div class="blog-masthead">
        <div class="container">
            <nav class="nav">
                <a class="nav-link active" href="#">Home</a>
                <a class="nav-link" href="#">New features</a>
                <a class="nav-link" href="#">Press</a>
                <a class="nav-link" href="#">New hires</a>

                // 檢查是否有登入
                @if(Auth::check())
                    <a class="nav-link ml-auto" href="#">{{Auth::user()->name}}</a>
                @endif
                
            </nav>
        </div>
    </div>

    <div class="blog-header">
        <div class="container">
            <h1 class="blog-title">The Bootstrap Blog</h1>
            <p class="lead blog-description">An example blog template built with Bootstrap.</p>
        </div>
    </div>
</header>
~~~

## 登入
### SessionController
```php
    public function store()
    {
        // Attempt to authenticate the user
        // If so , automatically sign them in.
        if (!auth()->attempt(\request(['email', 'password']))) {
        	
        	// If not , redirect back with error message.
        	return back()->withErrors([
        		'message' => 'Please try again'
        	]);
        }
        
        // redirect to the home page.
        return redirect()->home();
    }

    public function destory()
    {
    	auth()->logout();
    	return redirect()->home();
    }
```
