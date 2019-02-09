// NPM import
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Local import
const userRouter = require('./components/user');
const bookRouter = require('./components/book');

// Code
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Router
app.use('/users', userRouter);
app.use('/books', bookRouter);

// Export
module.exports = app;
