var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT * FROM messages', function(err, rows) {
          if (err) {
            return reject(err);
          }
          return resolve(rows);
        });
      });
    }, // a function which produces all the messages
    post: function (message) {
      return new Promise(function(resolve, reject) {
        // var obj = {text: 'my message', room_id: 1, user_id: 1};
        db.query('INSERT INTO messages (text, room_id, user_id) VALUES ("message here", 1, 1)', function(err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    } // a function which can be used to insert a message into the database
  },
  
  users: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT * FROM users', function(err, rows) {
          if (err) {
            return reject(err);
          }
          return resolve(rows);
        });
      });
    }, // a function which produces all the users
    post: function () {}
  }
};