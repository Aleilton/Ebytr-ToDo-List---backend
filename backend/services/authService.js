const jwt = require('jsonwebtoken');

require('dotenv').config();

const { API_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: 86400000, // 24horas
  algorithm: 'HS256',
};

const genToken = (data) => jwt.sign(data, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};
