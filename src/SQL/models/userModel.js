const pool = require("../services/db");

function insertNewUser(data, callback) {
	const SQLQUERY = `
        INSERT INTO User (username, email)
        VALUES (?, ?);
    `;

	const VALUES = [data.username, data.email];

	pool.query(SQLQUERY, VALUES, callback);
}

function selectAllUsers(data, callback) {
	const SQLQUERY = `
        SELECT * FROM User
        ORDER BY User.user_id;
    `;

	pool.query(SQLQUERY, callback);
}

function selectUserById(data, callback) {
	const SQLQUERY = `
        SELECT * FROM User
        WHERE user_id = ?;
    `;

	const VALUES = [data.user_id];

	pool.query(SQLQUERY, VALUES, callback);
}

function updateUserById(data, callback) {
	const SQLQUERY = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;
    `;

	const VALUES = [data.username, data.email, data.user_id];

	pool.query(SQLQUERY, VALUES, callback);
}

function deleteUserById(data, callback) {
	const SQLQUERY = `
        DELETE FROM User
        WHERE user_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.user_id];

	pool.query(SQLQUERY, VALUES, callback);
}

module.exports = {
	insertNewUser,
	selectAllUsers,
	selectUserById,
	updateUserById,
	deleteUserById,
};
