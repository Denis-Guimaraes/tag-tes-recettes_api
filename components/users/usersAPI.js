// NPM import
const express = require('express');

// Local import
const users = require('./usersController');

// Code
const router = express.Router();

router.get('/', users.findAll);

// Export
module.exports = router;
