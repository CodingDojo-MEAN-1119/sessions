const router = require('express').Router();

const BookRoutes = require('./book.routes');


module.exports = router.use('/books', BookRoutes);
