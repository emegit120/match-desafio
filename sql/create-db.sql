CREATE USER 'user'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON * . * TO 'user'@'%';
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS `desafio`;
CREATE DATABASE `desafio`;

USE `desafio`;

CREATE TABLE `client` (
  `id` varchar(255) NOT NULL,
  `listid` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `celphone` varchar(30) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `client_list` (
  `id` varchar(255) NOT NULL,
  `listid` varchar(255) NOT NULL,
  `total` int(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

