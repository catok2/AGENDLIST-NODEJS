const mysql = require('mysql2');
const express = require("express");

const pool = mysql.createPool({
// host: 'myserverproduct.net',
// port: 3306, 
// user: 'catok2',
// password: Astrologo2$,
// database: 'productos',
  host:'sql10.freesqldatabase.com',
  port : 3306,
  user :'sql10647136',
  password:'sTTh1tviLz',
  database:'sql10647136'

  // host: '127.0.0.1',
  // port: 3399, 
  // user: 'root',
  // password: 'Ms_MariaDB_Des',
  // database: 'productos',
});



pool.promise().getConnection() 
  .then(connection => {
    
    console.log("Conexión a la base de datos fue exitosa.");
    connection.release();
  })
  .catch(error =>{
    console.error("Hubo un error de conexión", error);
  });


module.exports = {
  db: pool.promise()
};

/*const mysql = require('mysql2');
const express = require("express");
host: 'mysql-catok2.alwaysdata.net',
 waitForConnections: true,
  connectionLimit : 10,
  queueLimit:0
const connection = mysql.({
  host:'2a00:b6e0:1:210:1::1',
  port:3306,
  user: 'catok2',
  password: 'Astrologo2$',
  database: 'catok2_productos_items',
  
 
})
/*
connection.getConnection((error,connection) =>{

  if(error){
    console.error("Hubo un error de conexión", error);
  }else{
    console.log("Conexión a la base de datos fue exitosa.");
    connection.release();
  }

});
*/
/*
module.exports = {
  db: connection.promise()
  };*/