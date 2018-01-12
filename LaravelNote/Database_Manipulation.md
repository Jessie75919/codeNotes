# Accessor

可以在資料從資料庫取出到回傳回去之前做一些操作

```
╔══════════╗			    ╔══════════╗
║ DataBase ║ --(get name)-> jc -->  ║ Accessor ║ --> JC 
╚══════════╝			    ╚══════════╝
	

```

`Route.php` 做一個單存的存取 `User` 的 `name` 屬性值

```php
Route::get('/accessor',function(){
	$user = User::find(13);
	return $user->name;
});

```

> 在 `User` 中 設定 **`getEmailAttribute`** 的方法
> > 他的命名規則為 `get` + **`表格欄位的名字`** + `Attribute`
> > ex : name  => getNameAttribute( $val )
> > ex : title => getTitleAttribue( $val )

```php
public function getEmailAttribute($val)
{
	// 回傳第一個字變成大寫
	return ucfirst($val);
}

```

# Mutators
在要寫進資料庫之前對資料作一些操作
```
╔══════════╗			    ╔══════════╗
║ DataBase ║ <--(set name)- JC <--  ║ Mutators ║ <-- jc 
╚══════════╝			    ╚══════════╝
	

```

`Route.php`

```php

Route::get('/mutators',function(){
	$user = User::find(4);
	$user->name = 'ggyy_jc';
	$user->save();
});

```
> 在 `User` 中 設定 **`setEmailAttribute`** 的方法
> > 他的命名規則為 `set` + **`表格欄位的名字`** + `Attribute`
> > ex : name  => setNameAttribute( $val )
> > ex : title => setTitleAttribue( $val )

```php
public function setNameAttribute($val)
{
	$this->attributes['name'] = strtoupper($val);
}

```




# Date -> [Carbon](http://carbon.nesbot.com/docs/)
```php
Route::get('/dates',function(){
	$date = new DateTime('+1 week');
	echo $date->format('m-d-Y');
	echo "<br>";
						          // 顯示距離時間的差距( 7 days ago )
	echo Carbon::now()->addDays(7)->diffForHumans();
	echo "<br>";
	echo Carbon::now()->subMonth(5)->diffForHumans();
	echo "<br>";
});
```



