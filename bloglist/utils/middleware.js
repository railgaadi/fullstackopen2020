const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7);
    next();
  } else {
    request.token = null;
    next();
  }
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).end();
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  next(error);
};

module.exports = { tokenExtractor, errorHandler };
