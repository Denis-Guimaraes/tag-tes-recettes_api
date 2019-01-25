// NPM import
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

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
  const privateKeyPath = path.join(__dirname, 'private.key');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
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

// Export
module.exports = jwtSign;
