USE chat;

INSERT INTO users (name, hobby) VALUES ('Valjean', 'politics');
INSERT INTO users (name, hobby) VALUES ('Javer', 'capturing criminals');

INSERT INTO rooms (name, description) VALUES ('lobby', 'bright and cheery');
INSERT INTO rooms (name, description) VALUES ('prison', 'dark and musty');

INSERT INTO messages (text, room_id, user_id) VALUES ("for mercy's sake, just give me three days!", 1, 1);
INSERT INTO messages (text, room_id, user_id) VALUES ("Monsieur, le mayor we see each other plain", 2, 2);
