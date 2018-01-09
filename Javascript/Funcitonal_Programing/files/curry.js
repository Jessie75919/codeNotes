let dragon =
    name =>
        size=>
            element=>
                name + ' is a ' +
                size + ' dragon that breathes ' +
                element + "!" ;

    console.log(dragon('Joe')('tiny')('abc'));

//

var add = function (x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        }
    }
}

var puls5 = add(5);
var puls10_pulse5 = puls5(10);

console.log(puls5(10));



/*
let collegue = [
    { name: 'Jessie' , job: 'Delevoper'} ,
    { name: 'Juice'  , job: 'Designer'} ,
    { name: 'Joe'    , job: 'Animator'} ,
    { name: 'Rex'    , job: 'Effetor'}  ,
    { name: 'Auther' , job: 'Delevoper' }  ,
    { name: 'Jassic' , job: 'Modeler'}
];

let hasDeveloper = ( job, person ) => person.job === job;

let developers =
    collegue.filter( x => hasDeveloper('Delevoper',x));

console.log('developers = ' ,developers) ;

 */


