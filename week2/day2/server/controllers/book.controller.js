const Author = require('mongoose').model('Author');
const Book = require('mongoose').model('Book');

module.exports = {
  index(request, response) {
    Book.find({})
      .populate('author')
      .then(books => response.render('books/index', { books }))
      .catch(error => {
        console.log(error);
        response.redirect('/');
      });
  },
  show(request, response) { },
  new(request, response) {
    Author.find({})
      .then(authors => {
        console.log('auhtors', authors);
        response.render('books/new', { authors: authors });

      }).catch(error => {
        console.log(error);

        response.redirect('/');
      })
  },
  create(request, response) {
    console.log('creating book', request.body);
    Book.create(request.body)
      .then(book => {
        console.log(book);

        return Author.findById(book.author)
          .then(author => {
            author.books.push(book);

            return author.save();
          })
          .then(() => {
            response.redirect('/books');
          });
      })
      .catch(error => {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);

        response.render('books/new', { errors });
      });
  },
  edit(request, response) { },
  update(request, response) { },
  destroy(request, response) { },
};
