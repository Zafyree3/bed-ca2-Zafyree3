const mysql = require("mysql2");

const setting = {
	connectionLimit: 10,
	host: "127.0.0.1",
	user: "root",
	password: "Zafyree@3003",
	database: "bed_ca1",
	multipleStatements: true,
	dateStrings: true,
};

const pool = mysql.createPool(setting);

module.exports = pool;
