// NPM import
const express = require('express');

// Local import
const createUser = require('./createUser');

// Code
const router = express.Router();
// route for signup
router.post('/signup', async (req, res) => {
  const data = await createUser(req.body);
  res.status(data.status).send(data.body);
});

// Export
module.exports = router;
