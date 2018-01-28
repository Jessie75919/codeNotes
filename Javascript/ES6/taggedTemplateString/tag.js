var injectWord = 'Wow';


var show = `${injectWord} !! what happened ?? 
${injectWord} !! Are you OK ?`;


console.log( show );

console.log( '========================' );
var one = 1;

var two = 2;
let sum = `the answer of ${one} + ${two} = ${one + two}`;
console.log( sum );

console.log( '========================' );


let tagged = function(strArr, ...vals)
{
    console.log( strArr );
    console.log( vals );
};

tagged `the answer of ${one} + ${two} = ${one + two}` ;
// tagged  文字的部分會變成strArr 的陣列 , 數字則會變成 vals 的陣列
