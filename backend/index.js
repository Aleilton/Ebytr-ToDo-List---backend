const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (_req, res) => res.send('Ebytr ToDo List'));

app.use(router);

app.use(errorHandler);

module.exports = app;
