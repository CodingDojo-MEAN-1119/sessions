const mongoose = require('mongoose');
console.log('creating author model');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Author name is required'],
    minlength: [2, 'More name...'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio needed'],
    minlength: [10, 'Give a bio please']
  },
  age: {
    type: Number,
    min: [5, 'Too young'],
    required: true
  },
  isAlive: {
    type: Boolean,
    default: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});


module.exports = mongoose.model('Author', AuthorSchema);
