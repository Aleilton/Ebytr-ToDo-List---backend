const app = require('./index');

require('dotenv').config();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Servidor conectado na porta ${port}!`));
