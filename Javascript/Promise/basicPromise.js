let promiseCount = new Promise( function(resolve, reject)
{
    let is999999 = true;

    if( is999999 ) {
        resolve( 'Yes' );
    }
    else {
        reject( "NO" );
    }
} );

promiseCount.then( function(fromResolve)
{
    console.log( 'done !! ' + fromResolve );
} ).catch( function(fromReject)
{
    console.log( 'somthingWrong....' + fromReject );
} );