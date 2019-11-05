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
    .then(authors => {
      console.log('all authors', authors);
      response.render('authors/index', { authors });
    })
});

app.get('/authors/new', function (_request, response) {
  response.render('authors/new');
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
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);

      response.render('authors/new', { errors });
    });
});


app.listen(port, () => console.log(`Express server listening on port ${port}`));
