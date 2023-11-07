const pool = require("../services/db");

async function insertNewUser(data) {
	const SQLQUERY = `
        INSERT INTO User (username, email)
        VALUES (?, ?);
    `;

	const VALUES = [data.username, data.email];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllUsers() {
	const SQLQUERY = `
        SELECT * FROM User
        ORDER BY User.user_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectUserById(data) {
	const SQLQUERY = `
        SELECT * FROM User
        WHERE user_id = ?;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateUserById(data) {
	const SQLQUERY = `
        UPDATE User
        SET username = ?, email = ?
        WHERE user_id = ?;
`;

	const VALUES = [data.username, data.email, data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateUserPointsById(data) {
	const SQLQUERY = `
		UPDATE User
		SET points = ?
		WHERE user_id = ?;
	`;

	const VALUES = [data.points, data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteUserById(data) {
	const SQLQUERY = `
        DELETE FROM User
        WHERE user_id = ?;

        ALTER TABLE User AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewUser,
	selectAllUsers,
	selectUserById,
	updateUserById,
	deleteUserById,
	updateUserPointsById,
};
