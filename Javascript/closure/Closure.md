Closure
=======

```js
    function makeFun ()
    {
        var name = "Ready To Go";
        function showName ()
        {
            console.log(name);
        }
        return showName;
    }
    
    var myFunc = makeFun();
    myFunc();
```

* 當makeFun執行之後回傳了showName的函式並且指定給myFunc的變數上，所以myFunc的變數存放的就是showName的函式。

* 在showName的函式內存放了他要執行時所需要的環境，包含name的變數，所以雖然已經不在makeFun的函式內了，但是在makeFun回傳showName函數的同時等於也外帶了一份name的變數參照位址放在showName函式內。

* 所以在myFunc執行的時候(也就是執行showName函式)，才可以找到name的值並且正常的顯示。


## Function Factory


```js
    function makeAddFunc (x)
    {
        return function (y)
        {
            return x + y;
        }
    }
    
    var add5  = makeAddFunc(5);
    var add10 = makeAddFunc(10);
    
    console.log(add5(10));
    console.log(add10(10));

```

- when the makeAddFunc(5) was executed, it returns the anonymous function with the value of x which got from argument of makeAddFunc. but it isn't executed in this phase.
- the anonymous function was return and assign to var add5, so add5 is storing the function with x's value(5). so when it was executed with another argument , it will return the sum of x and the value of this argument.

## Emulating the private variables

```js
    var counter = ( function ()
    {
        // 模擬private 變數
        var privateCounter = 0;
    
        function changeBy (val)
        {
            privateCounter += val;
            console.log(privateCounter);
        }
    
        return {
            increment : function ()
            {
                changeBy ( 1 );
            } ,
            decrement : function ()
            {
                changeBy ( -1 );
            } ,
            value     : function ()
            {
                return privateCounter;
            }
        };
    } ) ();
    
    console.log('inner_privateCounter = ' + counter.value());
    counter.increment();
    counter.increment();
    console.log('inner_privateCounter = ' + counter.value());
    counter.decrement();
    privateCounter = 10;
    console.log('inner_privateCounter = ' + counter.value());
    console.log(privateCounter); // 10 跟 counter內的變數不是同一個
    counter.decrement();
    console.log('inner_privateCounter = ' + counter.value());

```

## Object Method Definition

```js
    function MyObject (name ,msg)
    {
        this.name = name;
        this.msg = msg;
    }
    
    MyObject.prototype.getName = function ()
    {
        return this.name;
    };
    
    MyObject.prototype.getMsg = function ()
    {
        return this.msg;
    };
    
    var obj = new MyObject('jc','show Time');
    console.log(obj.getMsg());
    console.log(obj.getName());
```
- 把物件方法定義在prototype上可以在每個物件上藉由繼承共享這些方法，而不是每個方法都自己帶著這些方法的定義才能使用。
 