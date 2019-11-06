const authorRoutes = require('./author.routes');
const bookRoutes = require('./book.routes');
const router = require('express').Router();


module.exports = router.use(authorRoutes).use(bookRoutes);
