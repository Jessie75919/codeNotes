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