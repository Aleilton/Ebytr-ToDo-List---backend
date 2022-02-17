const { getConnection } = require('./connections');

const COLLECTION_NAME = 'tasks';

const create = async (title, description, status, userId, priority, created, dueData) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).insertOne({
    title, description, status, userId, priority, created, dueData,
  });
  return result;
};

const getTasksByUserId = async (userId) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).find({ userId }).toArray();
  return result;
};

module.exports = {
  create,
  getTasksByUserId,
};
