const rescue = require('express-rescue');

const userService = require('../services/users');

const create = rescue(async (req, res, next) => {
  try {
    const { name, password, role, email} = req.body;
    const newUser = await userService.create(name, password, role, email);
    return res.status(201).json({ user: newUser.insertedId });
  } catch (error) {
    console.log(`ERROR: POST createUser => ${error.message}`);
    return next(error);
  }
});

module.exports = {
  create,
};
