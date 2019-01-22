// NPM import
const express = require('express');
const { checkSchema, validationResult } = require('express-validator/check');

// Local import
const userValidator = require('./userValidator');
const createUser = require('./createUser');
const email = require('../email');
const hash = require('../hash');
const activeUser = require('./activeUser');
const connectUser = require('./connectUser');
const jwt = require('../../jwt');

// Code
const router = express.Router();
// Route for signup
router.post('/signup', checkSchema(userValidator.signupSchema), async (req, res) => {
  // Data validation
  const error = await validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).send(error.array());
  }
  // Create user and send confirmation email
  const data = await createUser(req.body);
  if (data.status === 200) {
    email.confirmEmail(data.id);
  }
  res.status(data.status).send(data.body);
});
// Route for active user
router.get('/active/:hash', checkSchema(userValidator.activeSchema), async (req, res) => {
  // Data validation
  const error = await validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).send(error.array());
  }
  // Get hash data and active user
  const hashData = await hash.findHash(req.params.hash);
  const data = await activeUser(hashData);
  res.status(data.status).send(data.body);
});
// Route for signin
router.post('/signin', checkSchema(userValidator.signinSchema), async (req, res) => {
  // Data validation
  const error = await validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).send(error.array());
  }
  // Connect user and return JWT
  const data = await connectUser(req.body);
  if (data.status === 200) {
    data.body.token = jwt.jwtSign(data.body);
  }
  res.status(data.status).send(data.body);
});

// Export
module.exports = router;
