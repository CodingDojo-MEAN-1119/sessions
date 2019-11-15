const router = require('express').Router();
const apiRouter = require('express').Router();

const catchAllRoutes = require('./catch-all.routes');
const BookRoutes = require('./book.routes');


router.use('/books', BookRoutes);

module.exports = apiRouter.use('/api', router).use(catchAllRoutes);
