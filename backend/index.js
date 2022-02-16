const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Servidor conectado na porta ${port}!`));
