require("dotenv").config();
const mysql = require("mysql2");

const setting = {
	connectionLimit: 10,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT || 3306,
	ssl: {
		rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED == "true",
	},
	multipleStatements: true,
	dateStrings: true,
};

const pool = mysql.createPool(setting).promise();

module.exports = pool;
