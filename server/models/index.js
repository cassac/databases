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
    post: function () {} // a function which can be used to insert a message into the database
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