const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "caramelo",
  database: "agenda-petshop2",
});

module.exports = connection;
