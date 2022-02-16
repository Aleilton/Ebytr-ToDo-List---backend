const { getConnection } = require('./connections');

const COLLECTION_NAME = 'users';

const create = async (name, password, role, email) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).insertOne({ name, password, role, email });
  return result;
};

const getUserByEmail = async (email) => {
  const conn = await getConnection();
  const result = await conn.collection(COLLECTION_NAME).findOne({ email });
  return result;
};

module.exports = {
  create,
  getUserByEmail,
};
