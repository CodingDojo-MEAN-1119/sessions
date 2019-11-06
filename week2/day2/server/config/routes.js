const AuthorController = require('../controllers/author.controller');
const BookController = require('../controllers/book.controller');

console.log(AuthorController);


module.exports = function (app) {



  app.get('/books', BookController.index);

  app.get('/books/new', BookController.new);

  app.post('/books', BookController.create);
}
