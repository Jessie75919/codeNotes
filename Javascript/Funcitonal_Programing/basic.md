## filter

藉由return 是否符合條件的 boolean 過濾掉原本陣列的內容，把過濾過後（符合條件）產生新的陣列回傳。


```javascript
    var animanls = [
        {name: 'John', specis: 'Dog'},
        {name: 'Key', specis: 'Cat'},
        {name: 'Shiy', specis: 'Mouse'},
        {name: 'Guy', specis: 'Lion'}
    ];
    
    var dogs = animanls.filter(function (animanl) {
        return animanl.specis === 'Dog';
    });
    
    console.log(dogs);

```
#### console.log
```js
    [ { name: 'John', specis: 'Dog' } ]

```

## map

跟filter不同，而是將原本的陣列藉由callback function的內容對陣列的每一個元素加工產生一個新的陣列。

```js
    var animanls = [
        {name: 'John', specis: 'Dog'},
        {name: 'Key', specis: 'Cat'},
        {name: 'Shiy', specis: 'Mouse'},
        {name: 'Guy', specis: 'Lion'}
    ];
    
    var aniamlName = animanls.map((animanl) => animanl.name);
    console.log(aniamlName);

```
#### console.log
```js
    [ 'John = Dog', 'Key = Cat', 'Shiy = Mouse', 'Guy = Lion' ]
```

## reduce
可以將處理過後的物件或者是數值，繼續保留到下一個iteration時使用（累加 或其他用途）

```js
    var orders = [
        { amount: 100 },
        { amount: 450 },
        { amount: 230 },
        { amount: 40 }
    ];
    
    
    var totalAmount = orders.reduce(function ( sum , order ) {
        return sum + order.amount;
    }, 0 );
    
    console.log(totalAmount);

```