var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db",
  user: "user",
  password: "1234",
  database: "desafio"
});

con.connect(function(err) {
  if (err) throw err;
  console.log('thread id', con.threadId)
});


module.exports = con