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


























