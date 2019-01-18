// NPM import
const express = require('express');

// Local import
const UsersController = require('./usersController');

// Code
const router = express.Router();
// route for signup
router.post('/signup', async (req, res) => {
  const data = await UsersController.createUser(req.body);
  res.status(data.status).send(data.body);
});

// Export
module.exports = router;
