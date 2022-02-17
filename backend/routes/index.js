const express = require('express');

const router = express.Router();

const usersRouter = require('./users');
const loginRouter = require('./login');
const taskRouter = require('./task');

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/task', taskRouter);

module.exports = router;
