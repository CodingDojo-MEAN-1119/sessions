const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));


require('./server/config/database');
const routes = require('./server/routes');


app.use(routes);

app.listen(port, () => console.log(`Express server listening on port ${port}`));
