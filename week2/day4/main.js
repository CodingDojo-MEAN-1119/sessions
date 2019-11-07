var myStr = 'this is a string';
// myStr = '234';
console.log(myStr);
var array = ['dog', 'horse', 'cat'];
// const array = [];
array.push('baat');
// array.push({});
array.push(234);
array.push(true);
var first = array[0];
function isString(value) {
    return typeof value === 'string';
}
var person = {
    name: 'Bob'
};
person.age = 45;
var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    User.prototype.sayHello = function (name) {
        console.log("Hello " + name + " I am " + this.name);
    };
    return User;
}());
