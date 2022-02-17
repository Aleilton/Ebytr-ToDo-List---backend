const express = require('express');

const taskRouter = express.Router();

const auth = require('../middlewares/auth');

const {
  create, getTasksByUserId, update, deleteTask,
} = require('../controllers/tasks');

taskRouter.post('/', auth, create);
taskRouter.get('/', auth, getTasksByUserId);
taskRouter.put('/:id', auth, update);
taskRouter.delete('/:id', auth, deleteTask);

module.exports = taskRouter;
