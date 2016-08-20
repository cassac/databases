var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get()
        .then(function(results) {
          res.send(results);
        });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body).then(function(results) {
        console.log('results', results);
      });
      res.send('ok');
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.users.get()
        .then(function(results) {
          res.send(results);
        });
    }, 
    post: function (req, res) {}
  }
};

