const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 8000;

const logger = require('./server/middleware/logger');

console.log(logger);

// if (port === undefined) {
//   port = 8000;
// }

const names = ['Sally', 'Geogre', 'Jose'];

// console.log(path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger);
app.use(function (request, response, next) {
  console.log('inside middleware', request.body);

  next(new Error('whoops'));
});

app.use(function (error, request, response, next) {
  console.error(error.message);

  next();
});

function isAuthorized(request, response, next) {
  next(new Error('Not logged in'));
}


app.get('/', function (request, response) {
  // console.log(request);

  console.log('hello from express');

  // response.send('<h1>Hello from Express</h1>');
  response.render('index');
});


app.post('/names', [logger, isAuthorized], function (request, response) {
  console.log(request.body);
  const name = request.body.name;

  names.push(name);
  response.render('process', { name: name, names: names });

  // response.redirect('/');
});


app.get('/names/:nameId', function (request, response) {
  console.log(request.params);
  const id = request.params.nameId;
  response.send(names[id]);
});



app.listen(port, () => console.log(`Express server listening on port ${port}`));
