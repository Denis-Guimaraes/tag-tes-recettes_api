// NPM import
const validator = require('validator');
const bcrypt = require('bcrypt');

// Local import
const usersError = require('./usersError');
const usersDAL = require('./usersDAL');

// Code
class UsersController {
  validateString(string) {
    const validate = !validator.isEmpty(string) && validator.isAlphanumeric(string);
    return validate;
  }

  validateEmail(email) {
    const validate = !validator.isEmpty(email) && validator.isEmail(email);
    return validate;
  }

  async createUser(data) {
    const { username, email, password, confirmPassword } = data;
    let error = {};

    if (!this.validateString(username)) {
      error.username = 'Mauvais format de nom d\'utilisateur';
    }
    if (!this.validateEmail(email)) {
      error.email = 'Mauvais format d\'email';
    }
    if (!this.validateString(password) || password.length < 6) {
      error.password = 'Mauvais format de mot de passe';
    }
    if (!confirmPassword.match(password)) {
      error.confirmPassword = 'Erreur de confirmation de mot de passe';
    }

    if (Object.keys(error) <= 0) {
      try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await usersDAL.createUser(username, email, passwordHash);
        const userData = await user.get();

        const status = 200;
        const body = { username: userData.username, email: userData.email };
        return { status, body };
      } catch (error) {
        usersError.log({
          code: error.original.code,
          errno: error.original.errno,
          message: error.original.sqlMessage
        });

        const status = 500;
        const body = { database: 'une erreur est survenue, veuillez réessayer !' };
        return { status, body };
      }
    } else {
      const status = 400;
      const body = error;
      return { status, body };
    }
  };
}

// Export
module.exports = new UsersController();
