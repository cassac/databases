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
        db.query('INSERT INTO messages (text, room_id, user_id) VALUES ("' + message.text + '", ' + message.room_id +', ' + message.user_id+ ')', function(err, result) {
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
    post: function (user) {
      return new Promise(function(resolve, reject) {
        db.query('INSERT INTO users (name, hobby) VALUES ("' + user.username + '", "' + user.hobby + '")', function(err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    }
  },

  rooms: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT * FROM rooms', function(err, rows) {
          if (err) {
            return reject(err);
          }
          return resolve(rows);
        });
      });
    }, // a function which produces all the users
    post: function (room) {
      return new Promise(function(resolve, reject) {
        db.query('INSERT INTO rooms (roomname, description) VALUES ("' + room.roomname + '", "' + room.description + '")', function(err, result) {
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    }
  }
};