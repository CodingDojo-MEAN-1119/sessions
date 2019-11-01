const color = require('colors');

/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body, etc), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 params
*                 protocol
*                 route
*                 path
*                 query
*/


module.exports = function (request, response, next) {
  const keys = ['method', 'hostname', 'ip', 'body', 'params', 'path', 'protocol', 'route', 'query'];

  // for (let index = 0; index < keys.length; index++) {
  //   const key = keys[index];
  //   console.log(`key is ${key}`);

  // }

  keys.forEach(key => {
    const data = request[key];

    if (data) {

      if (typeof data === 'object') {
        if (Object.keys(data).length) {
          console.log(color.red(`The request ${key} object has these properties:`));
          // console.log(`key is ${key}`, data);
          // [ 'name', 'George' ]
          for (const [k, v] of Object.entries(data)) {
            console.log(color.blue(`\t${k} => ${v}`));
            // console.log(prop);
          }

        }
        // do object things
      } else {
        console.log(color.green(`The request ${key} is ${data}`));
      }
    }
  });

  next();
};

// const animals = ['cat', 'dog', 'horse'];

// const [cat, , dog] = animals;

// // const cat = animals[0];
// // const dog = animals[1];

// console.log(cat, dog);
