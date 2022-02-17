const { getConnection } = require('./connections');

const COLLECTION_NAME = 'tasks';

const create = async (title, description, status, userId, priority, created, dueData) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).insertOne({
    title, description, status, userId, priority, created, dueData,
  });
  return result;
};

const getTaskById = async (id) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).findOne({ _id: id });
  return result;
};

const getTasksByUserId = async (userId) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).find({ userId }).toArray();
  return result;
};

const update = async (id, title, description, status, userId, priority, dueData) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).updateOne(
    { _id: id }, { $set: { title, description, status, userId, priority, dueData } }
  );
  return result;
};

module.exports = {
  create,
  getTaskById,
  getTasksByUserId,
  update,
};
