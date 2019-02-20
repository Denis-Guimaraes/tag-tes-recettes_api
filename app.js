// NPM import
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Local import
const { userRouter } = require('./components/user');
const { bookRouter } = require('./components/book');
const { recipeRouter } = require('./components/recipe');

// Code
const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/recipes', recipeRouter);

// Export
module.exports = app;
