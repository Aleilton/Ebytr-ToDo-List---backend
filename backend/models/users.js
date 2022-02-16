const { getConnection } = require('./connections');

const create = async (name, password, role, email) => {
  const conn = await getConnection();
  const result = await conn.collection('users').insertOne({ name, password, role, email });
  return result;
};

module.exports = {
  create,
};
