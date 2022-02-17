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

const getTasksByUserId = async (req, res, next) => {
  try {
    const { userId } = req;
    const result = await taskService.getTasksByUserId(userId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: GET getTasksByUserId => ${error.message}`);
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueData } = req.body;
    const { userId } = req;
    const result = await taskService.update(
      id, title, description, status, userId, priority, dueData,
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(`ERROR: PUT updateTask => ${error.message}`);
    return next(error);
  }
};

module.exports = {
  create,
  getTasksByUserId,
  update,
};
