// change the file's name to 'connection.js'

const mysql = require("mysql");

// fill the fields with your database data
const connection = mysql.createConnection({
  host: "",
  port: 0000,
  user: "",
  password: "",
  database: "agenda-petshop2",
});

module.exports = connection;