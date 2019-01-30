// Code
// Function userError
const userError = (error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    console.log(error);
    return res.status(401).send(error.messages);
  }
  if (error.name === 'LinkError') {
    console.log(error);
    return res.status(404).send(error.messages[0]);
  }
  if (error.name === 'ConflictError') {
    console.log(error);
    return res.status(409).send(error.messages);
  }
  if (error.name === 'ValidationError') {
    console.log(error);
    return res.status(422).send(error.messages);
  }
  console.log(error);
  return res.status(500).send(['Une erreur inattendue est survenue. Veuillez réessayer!']);
};

// Export
module.exports = userError;
