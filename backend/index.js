const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const router = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Ebytr ToDo List'));

app.use(router);

app.listen(port, () => console.log(`Servidor conectado na porta ${port}!`));
