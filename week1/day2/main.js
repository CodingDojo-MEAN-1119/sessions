

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
    const value = callback(currentValue);

    console.log(currentValue, value);
    result.push(value);
  }


  return result;
}

console.log('square', map(values, function (element) {
  console.log('inside map function', element * element);

  return element * element;
}));


console.log('addtwo', map(values, function (value) {
  return value + 2;
}));
