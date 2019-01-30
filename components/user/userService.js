// NPM import
const bcrypt = require('bcrypt');

// Local import
const userDAL = require('./userDAL');

// Code
/**
 * Function createUser
 * @param {object} data
 */
const createUser = async (data) => {
  // Check if user already exist
  const userFind = await userDAL.findByEmail(data.email);
  if (userFind !== null) {
    const error = new Error('email already exists');
    error.name = 'ConflictError';
    error.messages = ['Email déjà lié à un compte utilisateur.'];
    throw error;
  }
  // Check if password match confirmPassword
  if (data.password !== data.confirmPassword) {
    const error = new Error('invalid value');
    error.name = 'ValidationError';
    error.messages = ['Confirmation mot de passe invalide.'];
    throw error;
  }
  // Create new user
  const passwordCrypt = await bcrypt.hash(data.password, 10);
  const userCreated = await userDAL.createUser(data.username, data.email, passwordCrypt);
  const userData = await userCreated.get();
  // Retrun result
  const result = {
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email
    },
    message: [`Pour compléter votre inscription, veuillez suivre le lien qui vous a été envoyé à votre adresse ${userData.email} afin d'activer votre compte.`]
  };
  return result;
};
/**
 * Function activeUser
 * @param {string} hashData
 */
const activeUser = async (hashData) => {
  // Check hash data
  if (hashData.hash_action_id !== 1 || !hashData.active) {
    const error = new Error('not found');
    error.name = 'LinkError';
    error.messages = [
      `<P>Lien inactif.</p>
      <a href="http://localhost:8080">Tag tes recettes</a>`
    ];
    throw error;
  }
  // Active user
  await userDAL.activeUser(hashData.user_id);
  // Return result
  const result = {
    message: `<P>Votre compte a bien été activé!</p>
    <a href="http://localhost:8080">Tag tes recettes</a>`
  };
  return result;
};
/**
 * Function connectUser
 * @param {object} data
 */
const connectUser = async (data) => {
  // Check if user email exist
  const userFind = await userDAL.findByEmail(data.email);
  if (userFind === null) {
    const error = new Error('unauthorized');
    error.name = 'UnauthorizedError';
    error.messages = ['Mot de passe ou email invalide.'];
    throw error;
  }
  // Check password and if is active user
  const password = await bcrypt.compare(data.password, userFind.password);
  if (!password || !userFind.active) {
    const error = new Error('unauthorized');
    error.name = 'UnauthorizedError';
    error.messages = ['Mot de passe ou email invalide.'];
    throw error;
  }
  // Return result
  const result = {
    user: {
      id: userFind.id,
      username: userFind.username,
      email: userFind.email
    }
  };
  return result;
};
/**
 * Function deleteUser
 * @param {integer} id
 */
const deleteUser = async (id) => {
  userDAL.deleteUser(id);
};

// Export
module.exports.createUser = createUser;
module.exports.activeUser = activeUser;
module.exports.connectUser = connectUser;
module.exports.deleteUser = deleteUser;
