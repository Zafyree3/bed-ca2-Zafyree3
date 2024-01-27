const pool = require("../services/db");

const SQLQUERY = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS UserPointsRel;
DROP TABLE IF EXISTS Cat;
DROP TABLE IF EXISTS CatOwned;
DROP TABLE IF EXISTS CatHistory;
DROP TABLE IF EXISTS Backyard;
DROP TABLE IF EXISTS BackyardCatRel;
DROP TABLE IF EXISTS Ability;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS ItemOwned;
DROP TABLE IF EXISTS Gacha;
DROP TABLE IF EXISTS GachaDrop;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Transactions;

CREATE TABLE Transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    points INT NOT NULL,
    points_change INT NOT NULL,
    date_occured TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message_text TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
);

CREATE TABLE UserPointsRel (
    points_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    points INT DEFAULT 0,
    last_updated TIMESTAMP
);

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT DEFAULT 0
);

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
);

CREATE TABLE Backyard (
    backyard_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name TEXT
);

CREATE TABLE BackyardCatRel (
    backyard_cat_id INT PRIMARY KEY AUTO_INCREMENT,
    backyard_id INT NOT NULL,
    cat_id INT NOT NULL,
    date_added TIMESTAMP
);

CREATE TABLE Cat (
    cat_num INT PRIMARY KEY,
    breed TEXT,
    ability_id INT
);

CREATE TABLE CatOwned (
    cat_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_name TEXT,
    owner_id INT NOT NULL,
    cat_num INT NOT NULL,
    date_owned TIMESTAMP
);

CREATE TABLE CatHistory (
    hist_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    prev_owner_id INT NOT NULL,
    cat_id INT NOT NULL,
    date_occured TIMESTAMP
);

CREATE TABLE Ability (
    ability_id INT PRIMARY KEY,
    action TEXT,
    description TEXT
);

CREATE TABLE Item (
    item_num INT PRIMARY KEY,
    name TEXT,
    price INT,
    description TEXT,
    ability_id INT
);

CREATE TABLE ItemOwned (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    item_num INT NOT NULL,
    quantity INT DEFAULT 1
);

CREATE TABLE Gacha (
    box_id INT PRIMARY KEY,
    name TEXT,
    description TEXT,
    price INT DEFAULT 0
);

CREATE TABLE GachaDrop (
    drop_id INT PRIMARY KEY AUTO_INCREMENT,
    cat_num INT NOT NULL,
    gacha_id INT NOT NULL,
    chance INT COMMENT 'will be out of 100'
);

`;

pool
	.query(SQLQUERY)
	.then(() => {
		console.log("Tables created");
		process.exit();
	})
	.catch((err) => console.error(err));
