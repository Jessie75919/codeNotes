#User

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
		public function comments()
		{
			return $this->hasMany(Comment::class);
		}

		public function user()
		{
			return $this->hasMany(User::class);
		}
	}
~~~
