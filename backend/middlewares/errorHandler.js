module.exports = (error, _req, res, _next) => {
  if (error.message) {
    console.log(`errorHandler: ${error}`);
    return res.status(error.status).json({
      message: error.message,
    });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
