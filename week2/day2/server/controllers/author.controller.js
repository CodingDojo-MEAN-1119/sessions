// const Author = require('../models/author.model');
const Author = require('mongoose').model('Author');



module.exports = {
  // requesting all author resouces
  index(request, response) {
    console.log('serving authors index');

    Author.find({})
      .populate('books')
      .then(authors => {
        console.log('all authors', authors);
        response.render('authors/index', { authors });
      }).catch(console.log);

  },
  // get one resource (author)
  show(request, response) {

  },
  // display form for creating resource
  new(request, response) {
    const author = new Author();

    response.render('authors/new', { author });
  },
  // create a single resource (author)
  create(request, response) {
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
  },
  // display form for editing a resource
  edit(request, response) {

  },
  // send updated resource for saving to database (author)
  update(request, response) {

  },
  // remove resource from database
  destroy(request, response) {

  },
};
