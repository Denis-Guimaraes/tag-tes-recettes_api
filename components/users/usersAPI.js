// NPM import
const express = require('express');

// Local import
const users = require('./usersController');

// Code
const router = express.Router();

router.post('/', users.createUser);

// Export
module.exports = router;
