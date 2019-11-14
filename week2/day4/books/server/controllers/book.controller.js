// const mongoose = require('mongoose')
// const Book = mongoose.model('Book');
// const Book = require('../models/book.model');

const Book = require('mongoose').model('Book');
const { Http } = require('@status/codes');


module.exports = {
  index(_request, response) {
    Book.find({})
      .then(books => response.json(books))
      .catch(error => response.status(Http.InternalServerError).json(error));
  },
  create(request, response) {
    Book.create(request.body)
      .then(book => response.json(book))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  show(request, response) {
    const { book_id: bookId } = request.params;

    Book.findById(bookId)
      .then(book => {
        if (!book) {
          throw new Error(`Book with id ${bookId} not found!`);
        }

        response.json(book);
      })
      .catch(error => {
        response.status(Http.NotFound).json(error);
      });
  },
  update(request, response) {
    const { book_id: bookId } = request.params;
    Book.findByIdAndUpdate(bookId, request.body, { new: true, runValidators: true })
      .then(book => response.json(book))
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(request, response) {
    const { book_id: bookId } = request.params;
    Book.findByIdAndRemove(bookId)
      .then(book => response.json(book))
      .catch(error => response.status(Http.Conflict).json(error));
  },
};
