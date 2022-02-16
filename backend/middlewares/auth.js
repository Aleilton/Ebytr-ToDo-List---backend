const authService = require('../services/authService');

const { errorObject } = require('../utils/errorObject');

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw errorObject('Missing auth token', 401);
    }
    const verifyAuth = authService.verifyToken(authorization);
    if (!verifyAuth) {
      throw errorObject('jwt malformed', 401);
    }
    const { _id: userId, role } = verifyAuth;
    req.userId = userId;
    req.role = role;
    next();
  } catch (error) {
    console.log(`ERROR: auth middleware => ${error.message}`);
    return next(error);
  }
};
