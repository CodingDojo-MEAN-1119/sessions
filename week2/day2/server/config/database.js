const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsDir = path.join(__dirname, '../models');

mongoose.connect('mongodb://localhost/authors_books', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('connected', () => console.log('Connected to MOngodb'));

console.log(modelsDir);

fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js'))
  .forEach(file => require(path.join(modelsDir, file)));

