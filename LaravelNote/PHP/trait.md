#trait
<br/>
在trait定義好方法

```
trait T_log
{

    public function start(){
    
        echo " I am starting ...."
    }
    
    public function sto[(){
    
        echo " stop ...."
    }

}
```

在User內注入trait
<br/>
<br/>


```
class User{

    use T_log;

}
```
<br/>
<br/>
在House內注入trait

```
class House{

    use T_log;

}
```

## 比較

把共同會使用到的方法統一放在trait裡面統一管理，而不用像是用Interface的方法，要其他實作的class分別去實作功能一樣的方法，也不用像是繼承之後就要無條件的強制繼續繼承下去，而是需要的人自己來導入trait就可以使用trait提供的功能了。

* extends繼承 ＝ 親爸爸
* trait ＝ 毫無保留的乾爸爸
    * 告訴你這個功能，且也實作這個功能給你了。
* interface 介面 ＝ 偷留一手的乾爸爸
    * 因為要只告訴你有這個功能，但是得自己實作這個功能 

    

## 作用範圍

trait內不管是那個modifier(public \ private \ protected )的方法都會被複製到導入的class內，但是只能使用於直接導入的class內，如果是繼承直接導入trait的class的子class，則無法使用trait提供的功能。


## instandof & As
<br/>

```
trait A 
{
    function someFunc() 
    {
        ... 
    }

    function otherFunc() 
    {
        ...
    }
}

trait B 
{
    function someFunc() 
    { 
        ...
    }

    function otherFunc() 
    {
        ...
    }
}

class MyClass 
{
    use A, B {
        A::someFunc insteadof B;
        // 使用A的someFunc，而不要用B的someFunc
        
        B::otherFunc as differentFunc;
        // 替B的otherFunc 取個別名叫做 differentFunc
    }
}
```

## Namespace vs trait
```

namespace Illuminate\Foundation\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
// ↑ Namespace

trait RegistersUsers
{
    use RedirectsUsers;
    // ↑ 導入 trait


```


# Final
<br/>
> **想要共享相同程式功能 => trait**
<br/>

<br/>


[筆記來源](http://oomusou.io/php/php-trait/)









