// NPM import
const express = require('express');
const { checkSchema, validationResult } = require('express-validator/check');

// Local import
const userValidator = require('./userValidator');
const createUser = require('./createUser');
const activeUser = require('./activeUser');
const connectUser = require('./connectUser');
const hash = require('../hash');
const email = require('../email');
const jwt = require('../../jwt');

// Code
const router = express.Router();
// Route for signup
router.post('/signup', checkSchema(userValidator.signupSchema), async (req, res) => {
  // Data validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errorMessage = error.array().map(value => value.msg);
    return res.status(422).send({ error: errorMessage });
  }
  // Create user and send confirmation email
  const data = await createUser(req.body);
  if (data.status === 200) {
    const getHash = await hash.createHash(1, data.id);
    const hashData = await getHash.get();
    email.confirmEmail(hashData.hash, data.body.userData.email);
  }
  res.status(data.status).send(data.body);
});
// Route for active user
router.get('/active/:hash', checkSchema(userValidator.activeSchema), async (req, res) => {
  // Data validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errorMessage = error.array().map(value => value.msg);
    return res.status(422).send({ error: errorMessage });
  }
  // Get hash data and active user
  const hashData = await hash.findHash(req.params.hash);
  const data = await activeUser(hashData);
  hash.disableHash(hashData.hash);
  res.status(data.status).send(data.body);
});
// Route for signin
router.post('/signin', checkSchema(userValidator.signinSchema), async (req, res) => {
  // Data validation
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const errorMessage = error.array().map(value => value.msg);
    return res.status(422).send({ error: errorMessage });
  }
  // Connect user and return JWT
  const data = await connectUser(req.body);
  if (data.status === 200) {
    data.body.userData.token = jwt.jwtSign(data.body);
  }
  res.status(data.status).send(data.body);
});

// Export
module.exports = router;
