const express = require('express');

const taskRouter = express.Router();

const auth = require('../middlewares/auth');

const { create } = require('../controllers/tasks');

taskRouter.post('/', auth, create);

module.exports = taskRouter;
