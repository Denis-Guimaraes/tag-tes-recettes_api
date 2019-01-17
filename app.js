// NPM import
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Local import
const usersRouter = require('./components/users');

// Code
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use('/users', usersRouter);

// Export
module.exports = app;
