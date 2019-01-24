module.exports.signupSchema = {
  username: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isEmpty: false
  },
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } }
  },
  confirmPassword: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } }
  }
};

module.exports.activeSchema = {
  hash: {
    in: ['params'],
    exists: true,
    isUUID: true,
    trim: true
  }
};

module.exports.signinSchema = {
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } }
  }
};
