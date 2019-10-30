function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;
  console.log('ordered', item);

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('filling ', item);
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function () { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function () { return 'start painting!' }
        },
        tarp: {
          product: 'A Large Tarp',
          directions: () => 'cover the floor!'
        }
      };

      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`${item} is out of stock`));
      }

    }, deliveryTime);
  });
}

function receivedItem(item) {
  console.log(`Received ${item.product}, time to ${item.directions()}`);
}


const paint = orderSupplies('paint');
const tarp = orderSupplies('tarp');
const brush = orderSupplies('brush');
// const roller = orderSupplies('roller')


// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
//   .then(() => roller)
//   .then(receivedItem)

//   .catch(handleError);


Promise.all([tarp, paint, brush])
  .then(items => {
    items.forEach(receivedItem);
  })
  .catch(handleError);


function handleError(error) {
  console.log(error.message);
}
/**
 * Possible Output:
 *
 * Received Neon Green Paint, time to mix it!
 * Received Horsehair brush, time to start painting!
 *
 * or
 *
 * Received Horsehair brush, time to start painting!
 * Received Neon Green Paint, time to mix it!
 *
 * Consider the second set. We immediately try to paint,
 * but how can we paint if we have not received it yet?
*/

// orderSupplies('paint', function (item) {
//   receivedItem(item);
//   orderSupplies('brush', receivedItem);
// });


// let havePaint = false;

// orderSupplies('paint', function (item) {
//   receivedItem(item);

//   havePaint = true;
// });

// orderSupplies('brush', function (item) {
//   if (havePaint) {
//     receivedItem(item);
//   } else {
//     const timer = setInterval(function () {
//       console.log('....checking for paint');

//       if (havePaint) {
//         receivedItem(item);
//         clearInterval(timer);
//       }
//     }, 100);
//   }
// });

// orderSupplies('brush', handleBrush);

// function handleBrush(item) {
//   console.log('brush?', item);
//   if (havePaint) {
//     return receivedItem(item);
//   }

//   console.log('..checking for paint');

//   setTimeout(handleBrush, 100, item);
// }

// [ { product: 'paint', directions: [Function: directions] } ,{ product: 'Horsehair brush', directions: [Function: directions] }, ]

const orders = ['paint', 'brush'];


function orderHelper(items) {
  const results = [];

  let ordersReceived = 0;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    console.log(`item is ${item} at index ${index}`);

    orderSupplies(item, function (product) {

      results[index] = product;
      console.log(product, results, index);
      ordersReceived++;
      // console.log(results.filter(p => p).length);
      if (ordersReceived === items.length) {
        // loop & print every

        results.forEach(receivedItem);
      }
    });
  }
}

// orderHelper(orders);

// const paint = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);
//   orderSupplies('paint', resolve)
// });
// const brush = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);
//   orderSupplies('brush', resolve)
// });

// const tarp = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);
//   orderSupplies('tarp', resolve)
// });

// tarp
//   .then(receivedItem)
//   .then(() => paint)
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
//   .catch(console.log);



