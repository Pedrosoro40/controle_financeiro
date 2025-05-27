const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',       // ← substitua pelo seu usuário do MySQL
  password: 'sua_senha',     // ← substitua pela sua senha
  database: 'financeiro'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

module.exports = connection;
