const BookController = require('../controllers/book.controller');
const router = require('express').Router();

module.exports = router
  .get('/books', BookController.index)
  .get('/books/new', BookController.new)
  .post('/books', BookController.create);
