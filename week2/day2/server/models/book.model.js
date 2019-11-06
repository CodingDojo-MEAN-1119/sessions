const mongoose = require('mongoose');
console.log('creating book model');
const { Schema } = mongoose;
const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  pages: {
    type: Number,
    min: 1,
    required: true,
  },
  publisher: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Book', BookSchema);
