const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Ms_MariaDB_Des',
  database: 'productos',
  port:3399
});

module.exports = connection;