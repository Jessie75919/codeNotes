// let getUp = () => {
//     return new Promise( function(resolve, reject)
//     {
//         resolve(  ' I Got up ! ,' );
//     } )
// } ;

let getUp = () => {
    return new Promise( ( (resolve, reject) => resolve( ' I Got up ! ,' ) ) )
};


// let brushTeeth = function(msg)
// {
//     return new Promise( function(resolve, reject)
//     {
//         resolve( msg + ' I finished teeth brushing,' );
//     } )
// };

let brushTeeth = (msg) => {
    return new Promise( (resolve, reject) =>
    {
        resolve( msg + ' I finished teeth brushing,' );
    } );
};


let goToSchool = (msg) => {
    return new Promise( (resolve, reject) => {
        resolve( msg + 'I get out !' );
    } );
};


/*
 |======================================================
 | one after another
 |======================================================
 */

getUp()
    .then( (msg) => brushTeeth( msg ) )
    .then( msg => goToSchool( msg ) )
    .then( msg => console.log( msg ) );

// getUp().then( function(msg)
// {
//     return ;
// } ).then( function(msg)
// {
//     return goToSchool( msg );
//
// } ).then( function(msg)
// {
//     console.log( 'msg : ', msg );
//     console.log( 'I am at school' );
// } );


/*
 |======================================================
 | Promise.all()
 | 全部RUN完在執行then的CALLBACK
 |======================================================
 */

/* Promise.all( [
 getUp(),
 brushTeeth(),
 goToSchool()
 ] ).then( function()
 {
 console.log( 'I am at school' );
 } );*/

/*
 |======================================================
 | Promise.race()
 | 只要有一個做完就執行then的callback
 |======================================================
 */

/*Promise.race( [
 getUp(),
 brushTeeth(),
 goToSchool()
 ] ).then( function()
 {
 console.log( 'I just do one thing' );
 } );*/


