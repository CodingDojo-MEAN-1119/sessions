

function doStuff(value) {
  console.log(value.toString());
  if (typeof value === 'function') {
    // do function stuff
    console.log('doing function stuff');

    value();
  }
}


// doStuff(function () {
//   console.log('inside the function');
// });


// function addTwo(array) {
//   const result = [];

//   // result = []

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];

//     const value = element + 2;
//     console.log('stuff', element, index, value);
//     result.push(value);
//   }

//   return result;
// }


const values = [1, 2, 3, 4, 5, 5, 6];
// console.log(addTwo(values));


// function square(array) {
//   const result = [];

//   for (let index = 0; index < array.length; index++) {
//     const currentValue = array[index];
//     const value = currentValue * currentValue;
//     result.push(value);
//   }


//   return result;
// }

// console.log(square(values));

function map(array, callback) {
  const result = [];
  console.log(callback);
  for (let index = 0; index < array.length; index++) {
    const currentValue = array[index];
    // const value = currentValue * currentValue;
    const value = callback(currentValue, index, array);

    console.log(currentValue, value);
    result.push(value);
  }


  return result;
}


function square(number) {
  return number * number;
}


// console.log('square', map(values, square));


// console.log('addtwo', map(values, (value, index) => value + 2 + index));


// console.log('before');


// function sayHello() {
//   setTimeout(function () {
//     console.log('hellos');
//   }, 1000);
// }

// sayHello();

// console.log('after');


function getThingsFromDB(query, callback) {

  console.log('got query', query);

  return setTimeout(function () {
    const data = ['thing 1', 'thing 2', 'thing3'];

    console.log('callback', callback);
    console.log('things running ', data);

    callback(data);
  }, 1000);

}


getThingsFromDB('select * from things;', function (things) {
  console.log('inside anon async func', things);
  for (const thing of things) {
    console.log(`got a thing!!! ${thing}`);
  }
});
