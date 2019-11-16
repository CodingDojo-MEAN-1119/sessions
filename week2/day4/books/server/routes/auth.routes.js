const router = require('express').Router();

const { AuthController } = require('../controllers');

module.exports = router
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .delete('/logout', AuthController.logout);
