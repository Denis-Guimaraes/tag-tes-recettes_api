module.exports.signupSchema = {
  username: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isEmpty: false,
    errorMessage: 'Nom d\'utilisateur invalide.'
  },
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true,
    errorMessage: 'Email invalide.'
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Mot de passe invalide.'
  },
  confirmPassword: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Mot de passe confirmation invalide.'
  }
};

module.exports.activeSchema = {
  hash: {
    in: ['params'],
    exists: true,
    isUUID: true,
    trim: true,
    errorMessage: 'Hash invalide.'
  }
};

module.exports.signinSchema = {
  email: {
    in: ['body'],
    exists: true,
    isEmail: true,
    trim: true,
    errorMessage: 'Email invalide.'
  },
  password: {
    in: ['body'],
    exists: true,
    isString: true,
    trim: true,
    isLength: { options: { min: 6 } },
    errorMessage: 'Mot de passe invalide.'
  }
};
