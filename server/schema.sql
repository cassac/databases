CREATE DATABASE chat;

USE chat;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'rooms'
-- only organic
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` INTEGER(3) NOT NULL AUTO_INCREMENT,
  `name` CHAR(30) NOT NULL,
  `description` CHAR(150) NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'only organic';

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER(3) NOT NULL AUTO_INCREMENT,
  `name` CHAR(30) NOT NULL,
  `hobby` CHAR(30) NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `text` CHAR(150) NOT NULL,
  `created` TIMESTAMP NOT NULL,
  `room_id` INTEGER(3) NOT NULL,
  `user_id` INTEGER(3) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'followers'
-- 
-- ---

DROP TABLE IF EXISTS `followers`;
    
CREATE TABLE `followers` (
  `followee_id` INTEGER(3) NOT NULL,
  `follower_id` INTEGER(3) NOT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `messages` ADD FOREIGN KEY (room_id) REFERENCES `rooms` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `followers` ADD FOREIGN KEY (followee_id) REFERENCES `users` (`id`);
ALTER TABLE `followers` ADD FOREIGN KEY (follower_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `followers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `rooms` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `users` (`id`,`name`,`hobby`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`text`,`created`,`room_id`,`user_id`) VALUES
-- ('','','','','');
-- INSERT INTO `followers` (`followee_id`,`follower_id`) VALUES
-- ('','');
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

