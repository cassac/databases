var db = require('../db');
var Promise = require('bluebird');

var insertQuery = function(sql) {
  return new Promise(function(resolve, reject) {
    db.query(sql, function(err, result) {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

var selectQuery = function(sql) {
  return new Promise(function(resolve, reject) {
    db.query(sql, function(err, rows) {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};

module.exports = {
  messages: {
    get: function () {
      var sql = 'SELECT * FROM messages';
      return selectQuery(sql);
    }, // a function which produces all the messages
    post: function (message) {
      var sql = 'INSERT INTO messages (text, roomname, username) VALUES ("' + message.text + '", "' + message.roomname + '", "' + message.username + '")';
      return insertQuery(sql);
    } // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      var sql = 'SELECT * FROM users';
      return selectQuery(sql);
    }, // a function which produces all the users
    post: function (user) {
      user.hobby = user.hobby || '';
      var sql = 'INSERT INTO users (username, hobby) VALUES ("' + user.username + '", "' + user.hobby + '")';
      return insertQuery(sql);
    }
  },

  rooms: {
    get: function () {
      var sql = 'SELECT * FROM rooms';
      return selectQuery(sql);
    }, // a function which produces all the users
    post: function (room) {
      var sql = 'INSERT INTO rooms (roomname, description) VALUES ("' + room.roomname + '", "' + room.description + '")';
    }
  }
};