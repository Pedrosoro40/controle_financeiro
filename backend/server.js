const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactions = require('./routes/transactions');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/transactions', transactions);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
