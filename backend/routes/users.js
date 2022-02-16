const express = require('express');

const usersRouter = express.Router();

const usersControllers = require('../controllers/users');

usersRouter.post('/', usersControllers.create);

module.exports = usersRouter;
