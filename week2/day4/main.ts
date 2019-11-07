const myStr = 'this is a string';

// myStr = '234';

console.log(myStr);


const a: Array<string> = [];
const array: StringNumBool[] = ['dog', 'horse', 'cat'];
// const array = [];

array.push('baat');
// array.push({});
array.push(234);
array.push(true);

type StringNumBool = string | number | boolean;


const first = array[0];


function isString(value: any): value is string {
  return typeof value === 'string';
}

// if (isString(first)) {
//   first.
// }

// if (typeof first === 'string') {
//   // first.
// } else if (typeof first === 'number') {
//   // first.
// }

// interface Person {
//   age?: number;
//   name: string;
// }

// const person: Person = {
//   name: 'Bob'
// };

// person.age = 45;

class User {
  constructor(public name: string, public age: number) {
    this.sayHello(name);
  }

  protected sayHello(name: string) {
    console.log(`Hello ${name} I am ${this.name}`);
  }
}

const user = new User('Sally', 54);

// user.sayHello('hi');

class Person extends User {
  constructor(name: string, age: number, public email: string) {
    super(name, age);

    this.sayHello(name);
  }
}

const person = new Person('George', 23, 'person@person.com');

// person.sayHello(user.name);

