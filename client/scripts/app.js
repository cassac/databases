var app = {

  //TODO: The current 'toggleFriend' function just toggles the class 'friend'
  //to all messages sent by the user
  server: 'http://127.0.0.1:3000/classes/',
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,
  friends: {},

  init: function() {
    // Get username
    app.username = window.location.search.substr(10);

    // Cache jQuery selectors
    app.$message = $('#message');
    app.$chats = $('#chats');
    app.$roomSelect = $('#roomSelect');
    app.$userSelect = $('#userSelect');
    app.$send = $('#send');

    // Add listeners
    app.$chats.on('click', '.username', app.toggleFriend);
    app.$send.on('submit', app.handleSubmit);
    app.$roomSelect.on('change', app.saveRoom);
    app.$userSelect.on('change', app.saveUser);


    // Fetch previous messages
    app.startSpinner();
    app.fetch(false, 'messages/', app.handleMessages);

    // Fetch rooms
    app.fetch(false, 'rooms/', app.handleRooms);

    // Fetch users
    app.fetch(false, 'users/', app.handleUsers);
    // Poll for new messages
    setInterval(function() {
      app.fetch(false, 'messages/', app.handleMessages);
    }, 2000);
  },

  send: function(data, urlEndPoint) {
    app.startSpinner();
    // Clear messages input
    app.$message.val('');
    // POST the message to the server
    $.ajax({
      url: app.server + urlEndPoint,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        // Trigger a fetch to update the messages, pass true to animate
        // app.fetch();
        console.log('postData:', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(animate, urlEndPoint, callback) {
    $.ajax({
      url: app.server + urlEndPoint,
      type: 'GET',
      contentType: 'application/json',
      // data: { order: '-createdAt'},
      success: function(data) {
        // Don't bother if we have nothing to work with
        if (!data.results || !data.results.length) { return; }
        callback(data);
        app.stopSpinner();
      },
      error: function(data) {
        console.error('chatterbox: Failed to fetch messages');
      }
    });
  },

  handleMessages: function(data, animate) {
    var mostRecentMessage = data.results[data.results.length - 1];

    // Only bother updating the DOM if we have a new message
    if (mostRecentMessage.id !== app.lastMessageId) {
      var displayedRoom = $('.chat span').first().data('roomname');

      // Update the UI with the fetched messages
      app.populateMessages(data.results, animate);

      // Store the ID of the most recent message
      app.lastMessageId = mostRecentMessage.id;
    }
  },

  handleRooms: function(data) {
    // Only bother updating the DOM if we have a new message
    var displayedRoom = $('.chat span').first().data('roomname');
    // Update the UI with the fetched rooms
    app.populateRooms(data.results);
  },

  handleUsers: function(data) {
    // Only bother updating the DOM if we have a new message
    var displayedUser = $('.chat span').first().data('username');
    // Update the UI with the fetched Users
    app.populateUsers(data.results);
  },

  clearMessages: function() {
    app.$chats.html('');
  },

  populateMessages: function(results, animate) {
    // Clear existing messages

    app.clearMessages();
    app.stopSpinner();
    if (Array.isArray(results)) {
      // Add all fetched messages
      results.forEach(app.addMessage);
    }

    // Make it scroll to the bottom
    var scrollTop = app.$chats.prop('scrollHeight');
    if (animate) {
      app.$chats.animate({
        scrollTop: scrollTop
      });
    } else {
      app.$chats.scrollTop(scrollTop);
    }
  },

  populateRooms: function(results) {
    app.$roomSelect.html('<option value="__newRoom" selected>New room...</option></select>');

    if (results) {
      var rooms = {};
      results.forEach(function(data) {
        var roomname = data.roomname;
        if (roomname && !rooms[roomname]) {
          // Add the room to the select menu
          app.addRoom(roomname);

          // Store that we've added this room already
          rooms[roomname] = true;
        }
      });
    }

    // Select the menu option
    app.$roomSelect.val(app.roomname);
  },

  populateUsers: function(results) {
    app.$userSelect.html('<option value="__newUser" selected>New user...</option></select>');

    if (results) {
      var users = {};
      results.forEach(function(data) {
        var username = data.username;
        if (username && !users[username]) {
          // Add the room to the select menu
          app.addUser(username);

          // Store that we've added this user already
          users[username] = true;
        }
      });
    }

    // Select the menu option
    app.$userSelect.val(app.username);
  },

  addUser: function(username) {
    // Prevent XSS by escaping with DOM methods
    var $option = $('<option/>').val(username).text(username);

    // Add to select
    app.$userSelect.append($option);
  },

  addRoom: function(roomname) {
    // Prevent XSS by escaping with DOM methods
    var $option = $('<option/>').val(roomname).text(roomname);

    // Add to select
    app.$roomSelect.append($option);
  },

  addMessage: function(data) {
    if (!data.roomname) {
      data.roomname = 'lobby';
    }

    // Only add messages that are in our current room
    if (data.roomname === app.roomname) {
      // Create a div to hold the chats
      var $chat = $('<div class="chat"/>');

      // Add in the message data using DOM methods to avoid XSS
      // Store the username in the element's data
      var $username = $('<span class="username"/>');
      $username.text(data.username + ': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);

      // Add the friend class
      if (app.friends[data.username] === true) {
        $username.addClass('friend');
      }

      var $message = $('<br><span/>');
      $message.text(data.text).appendTo($chat);

      // Add the message to the UI
      app.$chats.append($chat);
    }
  },

  toggleFriend: function(evt) {
    var username = $(evt.currentTarget).attr('data-username');

    if (username !== undefined) {
      // Store as a friend
      app.friends[username] = true;

      // Bold all previous messages
      // Escape the username in case it contains a quote
      var selector = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';
      var $usernames = $(selector).toggleClass('friend');
    }
  },

  saveRoom: function(evt) {

    var selectIndex = app.$roomSelect.prop('selectedIndex');
    // clear messages
    app.clearMessages();
    // Reset newest message id
    app.lastMessageId = 0;
    // New room is always the first option
    if (selectIndex === 0) {
      var roomname = prompt('Enter room name');
      if (roomname) {
        // Set as the current room
        app.roomname = roomname;

        // Add the room to the menu
        app.addRoom(roomname);

        // Select the menu option
        app.$roomSelect.val(roomname);

        // Fetch messages again
        app.send({roomname: roomname}, 'rooms/');
        app.fetch(false, 'messages/', app.handleMessages);
      }
    } else {
      app.startSpinner();
      // Store as undefined for empty names
      app.roomname = app.$roomSelect.val();
      // Fetch messages again
      app.fetch(false, 'messages/', app.handleMessages);
    }
  },

  saveUser: function(evt) {

    var selectIndex = app.$userSelect.prop('selectedIndex');
    // New user is always the first option
    if (selectIndex === 0) {
      var username = prompt('Enter user name');
      if (username) {
        // Set as the current user
        app.username = username;

        // Add the user to the menu
        app.addUser(username);

        // Select the menu option
        app.$userSelect.val(username);

        // Fetch messages again
        app.send({username: username}, 'users/');
      }
    } else {
      app.startSpinner();
      // Store as undefined for empty names
      app.username = app.$userSelect.val();
    }
  },

  handleSubmit: function(evt) {
    var message = {
      username: app.username,
      text: app.$message.val(),
      roomname: app.roomname || 'lobby'
    };

    app.send(message, 'messages/');

    // Stop the form from submitting
    evt.preventDefault();
  },

  startSpinner: function() {
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function() {
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }
};
