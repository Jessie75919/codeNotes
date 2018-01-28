
// Older version
/*
    var x = function()
    {
        // var that = this;
        this.val = 1;
        setTimeout( function()
        {
            this.val++;
            console.log( this.val );
            // NaN
        }, 1 );
    };
*/

// Fat Arrow Version
var x = function()
{
    // var that = this;
    this.val = 1;
    setTimeout( () =>
    {
        this.val++;
        console.log( this.val );
        // 2
    }, 1 );
};

// var xx = new x();

//==============================================

var t = function()
{
    console.log( arguments[0] );
}

t( 1, 2, 4 );
// print 1

var tt = () =>
{
    console.log( arguments[ 0 ] );
};

tt( 1, 2, 4 );
// print nothing

// use '...n' = mutilply arguments
var tx = (...n) =>
{
    console.log( "...n = ",  n[ 0 ] );
};

tx( 1, 2, 4 );
