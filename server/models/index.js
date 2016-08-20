var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var results = db.query('SELECT * FROM users', function(err, rows) {
        if (err) {
          console.log('AAAAAAHHHHH LOOK AT ME: ', err);
          return err;
        } else {
          return rows;
        }
      });
      console.log(results);
      // return results;
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

