const x = function(...n)
{
    console.log( 'n = ', JSON.stringify( n, null, 4 ) );
    // console.log( n );
};

x( 1, 4, 5 );

console.log( '=========================' );

const doSth     = [ 'workout', 'learning', 'reading' ];
const dailyLife = [ 'wakeup', ...doSth, 'sleeping' ];

console.log( dailyLife );

console.log( '=========================' );

let a = [ 1, 2, 3 ];
let b = [ 'a', 'b', 'c' ];


console.log( 'tt' , JSON.stringify( a.push(...b) ,null,4) );

