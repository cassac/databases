USE chat;

INSERT INTO users (username, hobby) VALUES ('Valjean', 'politics');
INSERT INTO users (username, hobby) VALUES ('Javer', 'capturing criminals');

INSERT INTO rooms (roomname, description) VALUES ('lobby', 'bright and cheery');
INSERT INTO rooms (roomname, description) VALUES ('prison', 'dark and musty');

INSERT INTO messages (text, room_id, user_id) VALUES ("for mercy's sake, just give me three days!", 1, 1);
INSERT INTO messages (text, room_id, user_id) VALUES ("Monsieur, le mayor we see each other plain", 2, 2);
