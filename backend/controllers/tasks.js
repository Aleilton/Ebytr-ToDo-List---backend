const tasksService = require('../services/tasks');

const create = async (req, res, next) => {
  try {
    const {
      title, description, status, userId, priority, created= new Date(), dueData,
    } = req.body;
    const newTask = await tasksService.create(
      title, description, status, userId, priority, created, dueData,
    );
    return res.status(201).json({ taskId: newTask.insertedId });
  } catch (error) {
    console.log(`ERROR: POST createTask => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  create,
};
