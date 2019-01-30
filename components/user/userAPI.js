// NPM import
const express = require('express');
const { checkSchema } = require('express-validator/check');

// Local import
const { signupSchema, activeSchema, signinSchema, dataValidator } = require('./dataValidator');
const userController = require('./userController');
const userError = require('./userError');

// Code
const router = express.Router();
// Route for signup
router.post('/signup', [checkSchema(signupSchema), dataValidator], async (req, res, next) => {
  const body = { ...req.body };
  try {
    const data = await userController.signup(body);
    res.status(201).send(data.message);
  } catch (error) {
    next(error);
  }
});
// Route for active user
router.get('/active/:hash', [checkSchema(activeSchema), dataValidator], async (req, res, next) => {
  const params = req.params.hash;
  try {
    const data = await userController.active(params);
    res.status(200).send(data.message);
  } catch (error) {
    next(error);
  }
});
// Route for signin
router.post('/signin', [checkSchema(signinSchema), dataValidator], async (req, res, next) => {
  const body = { ...req.body };
  try {
    const data = await userController.signin(body);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});
// Error handler
router.use(userError);

// Export
module.exports = router;
