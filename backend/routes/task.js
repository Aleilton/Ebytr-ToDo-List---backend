const express = require('express');

const taskRouter = express.Router();

const auth = require('../middlewares/auth');

const { create, getTasksByUserId } = require('../controllers/tasks');

taskRouter.post('/', auth, create);
taskRouter.get('/', auth, getTasksByUserId);

module.exports = taskRouter;
