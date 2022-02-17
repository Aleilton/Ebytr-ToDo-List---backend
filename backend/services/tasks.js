const Joi = require('@hapi/joi');

const tasksModels = require('../models/tasks');

// const { errorObject } = require('../utils/errorObject');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string().required(),
  userId: Joi.string().required(),
  priority: Joi.number().integer().min(1).max(5),
  created: Joi.date().iso().required(),
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

module.exports = {
  create,
  getTasksByUserId,
};
