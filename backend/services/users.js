const Joi = require('@hapi/joi');

const usersModels = require('../models/users');

const { errorObject } = require('../utils/errorObject');

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const create = async (name, password, role, email) => {
  const { error } = userSchema.validate({ name, password, role, email });
  if (error) {
    const err = new Error(error.details.map((errorObj) => errorObj.message).toString());
    err.code = 'invalid_data';
    err.status = 400;
    throw (err);
  }

  const emailAlreadyExists = await usersModels.getUserByEmail(email);
  if (emailAlreadyExists) {
    throw (errorObject('Email already registered', 409));
  }

  const newUser = await usersModels.create(name, password, role, email);
  return newUser.ops[0];
};

module.exports = {
  create,
};
