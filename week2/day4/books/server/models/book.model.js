const mongoose = require('mongoose');

console.log('loading book model');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Book title is required'],
    minlength: [2, 'More title']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  year: {
    type: Number,
  },
  pages: {
    type: Number,
    required: [true, 'Some pages'],
    min: [1, 'more pages']
  },
  publisher: {
    type: String,
  },
}, {
  timestamps: true
});


module.exports = mongoose.model('Book', BookSchema);
