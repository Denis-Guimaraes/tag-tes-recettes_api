// NPM import
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Local import
const config = require('../config')();
// Code
/**
 * Function jwtSign
 * @param {object} user
 */
const jwtSign = (user) => {
  // Define payload
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  // Get private
  const privateKeyPath = path.join(config.app.basePath, '/config/private.key');
  const privateKEY = fs.readFileSync(privateKeyPath, 'utf8');
  // Define options
  const options = {
    issuer: 'Tag tes recettes',
    audience: 'http://localhost:8080',
    expiresIn: '1h',
    algorithm: 'RS256'
  };
  // Generate token
  const token = jwt.sign(payload, privateKEY, options);
  // Return token
  return token;
};
/**
 * Function jwtVerify
 * @param {string} token
 */
const jwtVerify = (token) => {
  // Define verify options
  const options = {
    issuer: 'Tag tes recettes',
    audience: 'http://localhost:8080',
    expiresIn: '1h',
    algorithm: ['RS256']
  };
  // Get public key
  const publicKeyPath = path.join(config.app.basePath, '/config/public.key');
  const publicKEY = fs.readFileSync(publicKeyPath, 'utf8');
  // Verify token
  const data = jwt.verify(token, publicKEY, options);
  return data;
};

// Export
module.exports.jwtSign = jwtSign;
module.exports.jwtVerify = jwtVerify;
