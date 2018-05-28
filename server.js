const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const hbs = require('hbs')
const path = require("path");
const favicon = require('serve-favicon');

///initializing the app
const app = express();

//setting up the database
const config = require('./config/database.js');
mongoose.Promise = Promise;
mongoose
  .connect(config.database)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
  })
  .catch(err => console.log('There was an error with your connection:', err));

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


//setting up routes
const index = require('./routes/index')
const articles = require('./routes/articles')
const notes = require('./routes/notes')
const scrape = require('./routes/scrape')

app.use('/', index)
app.use('/articles', articles);
app.use('/notes', notes);
app.use('/scrape', scrape);

//starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Listening on http://localhost:${PORT}`)
});


