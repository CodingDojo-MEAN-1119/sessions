var myStr = 'this is a string';

myStr = 234234;

console.log(myStr);
//             0     1       2
var array = ['cat', 'dog', 'fish'];


console.log(array.push('horse'));
console.log(array[0]);


for (let index = 0; index < array.length; index++) {
  console.log(array[index]);
}

// console.log('index aafter ', index);


// for (var index in array) {
//   console.log('index is ' + index, array[index]);
// }

// for (var element of array) {
//   console.log('element is ' + element);
// }


// var person = ['brown', 'blue', 45];

const person = {
  name: 'Bob',
  'hair': 'brown',
  "eyes": 'blue',
  age: 45,
  key: 'this is key'
};

person.height = 5.6;


// person = {};

// console.log(person['age']);


// for (var key in person) {
//   console.log('key is ' + key, person[key]);
// }


function sayHello(name) {
  console.log('Hello ' + person.name);

  person.name = name;
}

// sayHello('Jason');




console.log(person);