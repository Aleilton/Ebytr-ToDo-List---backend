const Joi = require('@hapi/joi');

const { ObjectId } = require('mongodb');

const tasksModels = require('../models/tasks');

const { errorObject } = require('../utils/errorObject');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().required(),
  userId: Joi.string().required(),
  priority: Joi.number().integer().min(1).max(5),
  created: Joi.date().iso(),
  dueData: Joi.date().iso().required(),
});

const create = async (title, description, status, userId, priority, created, dueData) => {
  const { error } = taskSchema.validate({
    title, description, status, userId, priority, created, dueData,
  });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = 400;
    throw (err);
  }

  const newtask = await tasksModels.create(
    title, description, status, userId, priority, created, dueData,
  );
  return newtask;
};

const getTasksByUserId = async (userId) => {
  const result = await tasksModels.getTasksByUserId(userId);
  return result;
};

const update = async (id, title, description, status, userId, priority, dueData) => {
  const { error } = taskSchema.validate({
    title, description, status, userId, priority, dueData,
  });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = 400;
    throw (err);
  }

  const taskFound = await tasksModels.getTaskById(new ObjectId(id));
  if (!taskFound) throw errorObject('Invalid entries. Try again.', 400);

  await tasksModels.update(
    new ObjectId(id), title, description, status, userId, priority, dueData,
  );

  const updateTask = await tasksModels.getTaskById(new ObjectId(id));
  return updateTask;
};

const deleteTask = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw (errorObject('Task not found', 404));
  }

  const taskFound = await tasksModels.getTaskById(new ObjectId(id));
  if (!taskFound) throw errorObject('Invalid entries. Try again.', 400);
  
  const result = await tasksModels.deleteTask(new ObjectId(id));
  return result;
};

module.exports = {
  create,
  getTasksByUserId,
  update,
  deleteTask,
};
