// Code
// Function recipeError
const recipeError = (error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return res.status(401).send(error.messages);
  }
  if (error.name === 'LinkError') {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return res.status(404).send(error.messages[0]);
  }
  if (error.name === 'ConflictError') {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return res.status(409).send(error.messages);
  }
  if (error.name === 'ValidationError') {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return res.status(422).send(error.messages);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }
  return res.status(500).send(['Une erreur inattendue est survenue. Veuillez réessayer!']);
};

// Export
module.exports = recipeError;
