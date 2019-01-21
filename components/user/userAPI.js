// NPM import
const express = require('express');

// Local import
const createUser = require('./createUser');
const activeUser = require('./activeUser');

// Code
const router = express.Router();
// Route for signup
router.post('/signup', async (req, res) => {
  const data = await createUser(req.body);
  res.status(data.status).send(data.body);
});
// Route for active user
router.get('/active/:hash', async (req, res) => {
  const data = await activeUser(req.params.hash);
  res.status(data.status).send(data.body);
});

// Export
module.exports = router;
