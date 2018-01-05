/*
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
 */

/*function makeAddFunc (x)
 {
 return function (y)
 {
 return x + y;
 }
 }

 var add5 = makeAddFunc(5);
 var add10 = makeAddFunc(10);

 console.log(add5(10));
 console.log(add10(10));*/

/*
 var counter = ( function ()
 {
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
 console.log(privateCounter); // 10
 counter.decrement();
 console.log('inner_privateCounter = ' + counter.value());
 */

function MyObject (name , msg)
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