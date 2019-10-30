function orderSupplies(item, callback) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  setTimeout(function () {
    warehouse = {
      paint: {
        product: 'Neon Green Paint',
        directions: function () { return 'mix it!' }
      },
      brush: {
        product: 'Horsehair brush',
        directions: function () { return 'start painting!' }
      }
    };

    callback(warehouse[item]);
  }, deliveryTime);
}

function receivedItem(item) {
  console.log(`Received ${item.product}, time to ${item.directions()}`);
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

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    console.log(`item is ${item} at index ${index}`);

    orderSupplies(item, function (product) {

      results[index] = product;
      console.log(product, results, index);
      // console.log(results.filter(p => p).length);
      if (results.filter(p => p).length === items.length) {
        // loop & print every

        results.forEach(receivedItem);
      }
    });
  }
}

orderHelper(orders);
