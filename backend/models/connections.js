const { MongoClient } = require('mongodb');

require('dotenv').config();

const { MONGO_DB_URL, DB_NAME } = process.env;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const getConnection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db(DB_NAME);
      return db;
    }));

module.exports = {
  getConnection,
};
