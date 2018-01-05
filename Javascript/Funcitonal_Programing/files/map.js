var animanls = [
    {name: 'John', specis: 'Dog'},
    {name: 'Key', specis: 'Cat'},
    {name: 'Shiy', specis: 'Mouse'},
    {name: 'Guy', specis: 'Lion'}
];

var aniamlName = animanls.map((animanl) => animanl.name);
// var aniamlName = animanls.map(function (animal) {
//     return animal.name + " = " + animal.specis;
// });

console.log(aniamlName);