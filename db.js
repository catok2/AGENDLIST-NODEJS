const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'mysql-catok2.alwaysdata.net',
  user: 'catok2_k',
  password: 'astrologo2',
  database: 'catok2_productos_items',
  port:3306,
  waitForConnections: true,
  connectionLimit : 10,
  queueLimit:0
})

connection.getConnection((error,connection) =>{

  if(error){
    console.error("Hubo un error de conexión", error);
  }else{
    console.log("Conexión a la base de datos fue exitosa.");
    connection.release();
  }

});

module.exports = {
  db: connection.promise()
  };