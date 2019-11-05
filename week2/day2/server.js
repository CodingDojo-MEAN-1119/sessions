const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const { Schema } = mongoose;
const app = express();


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


const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);


mongoose.connect('mongodb://localhost/authors_books', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('connected', () => console.log('Connected to MOngodb'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/authors', function (_request, response) {
  Author.find({})
    .populate('books')
    .then(authors => {
      console.log('all authors', authors);
      response.render('authors/index', { authors });
    })
});

app.get('/authors/new', function (_request, response) {
  const author = new Author();

  response.render('authors/new', { author });
});

app.post('/authors', function (request, response) {
  console.log(request.body);
  // const author = new Author({
  //   name: request.body.name,
  //   age: request.body.age,
  //   bio: request.body.bio,
  //   isAlive: request.body.isAlive,
  // })

  // const author = new Author(request.body)

  Author.create(request.body)
    .then(author => {
      console.log(author);
      response.redirect('/authors');
    })
    .catch(error => {
      console.log(error);
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);
      console.log('author create failed', errors);

      const isAlive = request.body.isAlive === 'true';
      const author = { ...request.body, isAlive };

      console.log('author is ', author);
      response.render('authors/new', { errors, author: author });
    });
});


app.get('/books', function (_request, response) {
  Book.find({})
    .populate('author')
    .then(books => response.render('books/index', { books }))
    .catch(error => {
      console.log(error);
      response.redirect('/');
    });
});

app.get('/books/new', function (_request, response) {
  Author.find({})
    .then(authors => {
      response.render('books/new', { authors: authors });

    }).catch(error => {
      console.log(error);

      response.redirect('/');
    })
});

app.post('/books', function (request, response) {
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
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
