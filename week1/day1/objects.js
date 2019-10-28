class Person {
  constructor(name, items) {
    this.name = name;
    this.items = items;
  }

  take(item, target) {
    // console.log(item, target);
    if (!target || !Array.isArray(target.items)) {
      throw new Error('target does not have an items array');
    }

    console.log('this is ', this)

    for (let index = 0; index < target.items.length; index++) {
      // console.log('contents is ' + target.items[index]);
      if (target.items[index] === item) {
        // console.log('found item ' + item);

        this.items.push(item);

        // remove item from target array
        target.items.splice(index, 1);

        // console.log(target.items);

        // slice
        // splice

        return true;
      }
    }

    return false;
  }
}


// function Person(name, items) {
//   if (!(this instanceof Person)) {
//     // console.log(`${name} is a this`);
//     return new Person(name, items);
//   }

//   this.name = name;

//   this.items = items;

//   // this.take = take;
//   console.log(this);
// }

// {
//   prototype: {
//     take:
//   }
// }

// Person.prototype.take = function take(item, target) {
//   // console.log(item, target);
//   if (!target || !Array.isArray(target.items)) {
//     throw new Error('target does not have an items array');
//   }

//   console.log('this is ', this)

//   for (let index = 0; index < target.items.length; index++) {
//     // console.log('contents is ' + target.items[index]);
//     if (target.items[index] === item) {
//       // console.log('found item ' + item);

//       this.items.push(item);

//       // remove item from target array
//       target.items.splice(index, 1);

//       // console.log(target.items);

//       // slice
//       // splice

//       return true;
//     }
//   }

//   return false;
// }


const bob = new Person('Bob', ['money', 'phone', 'keys']);
const sally = new Person('Sally', ['crackers', 'gold', 'lint']);


// console.log(bob);
sally.take('money', bob);

bob.take('gold', sally);

console.log(sally.take === bob.take);
// interface Target {
//   items: string[];
// }

// console.log(take('money', bob));
// // console.log('1' === 1);
console.log(bob);
console.log(sally);
const backpack = {
  items: ['compass', 'map', 'snack']
};

console.log(backpack);
// backpack.take = sally.take;
sally.take('snack', backpack);
// console.log(backpack);
console.log(sally);


sally.take.apply(backpack, ['gold', bob]);
console.log(backpack);
console.log(bob);
