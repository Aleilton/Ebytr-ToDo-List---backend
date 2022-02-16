const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DB_SERVER = new MongoMemoryServer();

const getConnection = async () => {
  const URLMock = await DB_SERVER.getUri();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  return MongoClient.connect(URLMock, OPTIONS);
};

module.exports = {
  getConnection,
};
