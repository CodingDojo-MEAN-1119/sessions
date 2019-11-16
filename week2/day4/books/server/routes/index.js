const router = require('express').Router();
const apiRouter = require('express').Router();

const catchAllRoutes = require('./catch-all.routes');
const AuthRoutes = require('./auth.routes');
const BookRoutes = require('./book.routes');

// /api/auth/login

router
  .use('/auth', AuthRoutes)
  .use('/books', BookRoutes);

module.exports = apiRouter.use('/api', router).use(catchAllRoutes);
