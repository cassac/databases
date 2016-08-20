USE chat;

INSERT INTO users (username, hobby) VALUES ('Valjean', 'politics');
INSERT INTO users (username, hobby) VALUES ('Javer', 'capturing criminals');

INSERT INTO rooms (roomname, description) VALUES ('lobby', 'bright and cheery');
INSERT INTO rooms (roomname, description) VALUES ('prison', 'dark and musty');

INSERT INTO messages (text, roomname, username) VALUES ("for mercy's sake, just give me three days!", 'lobby', 'Valjean');
INSERT INTO messages (text, roomname, username) VALUES ("Monsieur, le mayor we see each other plain", 'prison', 'Javer');
