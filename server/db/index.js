var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'chat',
  stringifyObjects: true
});


con.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('DB connection establisehd');
});

// con.end(function(err) {

// });

module.exports = con;
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
