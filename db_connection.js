var mysql = require('mysql');

var con = mysql.createPool({
  connectionLimit : 10,
  host: "db",
  user: "user",
  password: "1234",
  database: "desafio"
});

module.exports = con