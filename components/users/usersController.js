// Local import
const usersDAL = require('./usersDAL');

// Code
const createUser = async (req, res) => {
  let data = {};
  let error = {};
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (Object.keys(error).length === 0) {
    try {
      const user = await usersDAL.createUser(username, email, password);
      const userData = await user.get();
      data = { ...data, username: userData.username, email: userData.email };
    } catch (e) {
      console.error(e);
      error = { ...error, database: 'une erreur est survenue, veuillez réessayer !' };
      res.status(500).send(error);
    }
  }

  res.send(data);
};

// Export
module.exports.createUser = createUser;
