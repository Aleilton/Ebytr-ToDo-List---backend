const taskService = require('../services/tasks')

const create = async (req, res, next) => {
  try {
    const {
      title, description, status= 'pendente', priority= 1, created= new Date().toISOString(), dueData,
    } = req.body;
    const { userId } = req;
    const newTask = await taskService.create(
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
