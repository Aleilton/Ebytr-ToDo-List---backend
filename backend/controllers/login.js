const userService = require('../services/users');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.findUserLogin(email, password);
    return res.status(result.status).json({ token: result.message });
  } catch (error) {
    console.log(`ERROR: login => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  login,
};
