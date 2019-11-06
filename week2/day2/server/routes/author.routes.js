const AuthorController = require('../controllers/author.controller');
const router = require('express').Router();

module.exports = router
  .get('/authors', AuthorController.index)
  .get('/authors/new', AuthorController.new)
  .post('/authors', AuthorController.create);
