const express = require('express');

const taskRouter = express.Router();

const auth = require('../middlewares/auth');

const {
  create, getTasksByUserId, update,
} = require('../controllers/tasks');

taskRouter.post('/', auth, create);
taskRouter.get('/', auth, getTasksByUserId);
taskRouter.put('/:id', auth, update);

module.exports = taskRouter;
