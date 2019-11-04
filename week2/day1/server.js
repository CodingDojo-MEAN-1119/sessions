const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/animals', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('connected', () => console.log('Connected to Mongo'));

// const Schema = mongoose.Schema;

const { Schema } = mongoose;




// const m = {
//   Schema: 'this is schema',
//   Type: 'This is type',
// };

// // const Schema = m.Schema;
// const { Schema: schema, Type } = m;
// // const { Type } = m;

// console.log(Schema, Type, schema);

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  numberOfLegs: {
    type: Number,
    required: [true, 'provide some legs'],
    min: [0, 'min legs must be greater than 0']
  },
  isPet: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

// plural and lowercase collection => animals
const Animal = mongoose.model('Animal', AnimalSchema);

// const Animal = mongoose.model('Animal');


const animal = new Animal({
  name: 'Cat',
  numberOfLegs: 4,
  // isPet: false
})

console.log(animal);


// animal.save(function (error, savedAnimal) {
//   if (error) {
//     // do something - handle the error
//     throw error;
//   }


//   console.log(savedAnimal);
// })


// console.log(animal.save());
animal.save()
  .then(savedAnimal => {
    console.log(savedAnimal)
  })
  .catch(error => {
    // console.log(error.errors.name.message);



    // const keys = Object.keys(error.errors);
    // console.log(keys)

    const errors = Object.keys(error.errors).map(key => error.errors[key].message);

    // for (let index = 0; index < keys.length; index++) {
    //   console.log(`key is ${keys[index]}`);

    //   errors.push(error.errors[keys[index]].message);
    // }


    console.log(errors);
  })



Animal.find({})
  .then(animals => {
    console.log(animals);
  })
  .catch(console.log);
