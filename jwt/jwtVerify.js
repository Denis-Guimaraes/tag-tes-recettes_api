// NPM import
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Code
/**
 * Function jwtVerify
 * @param {string} token
 */
const jwtVerify = token => {
  // Define verify options
  const options = {
    issuer: 'Tag tes recettes',
    audience: 'http://localhost:8080',
    expiresIn: '1h',
    algorithm: ['RS256']
  };
  // Get public key
  const publicKeyPath = path.join(__dirname, 'public.key');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const publicKEY = fs.readFileSync(publicKeyPath, 'utf8');
  // Verify token
  try {
    const data = jwt.verify(token, publicKEY, options);
    return data;
  } catch (error) {
    return false;
  }
};

// Export
module.exports = jwtVerify;
