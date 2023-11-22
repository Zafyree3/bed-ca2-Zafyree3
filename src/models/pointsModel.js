const pool = require("../services/db");

async function insertNewUserPointRel(data) {
	const SQLQUERY = `
        INSERT INTO UserPointsRel (user_id,points,last_updated)
        VALUES (?,?,?);
    `;

	const VALUES = [data.user_id, data.points, data.last_updated];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllUserPointsRel(data) {
	const SQLQUERY = `
        SELECT * From UserPointsRel
        ORDER BY UserPointsRel.points_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectUserPointsRelById(data) {
	const SQLQUERY = `
        SELECT * FROM UserPointsRel
        WHERE points_id = ?;
    `;

	const VALUES = [data.points_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectUserPointsRelByUserId(data) {
	const SQLQUERY = `
        SELECT * FROM UserPointsRel
        WHERE user_id = ?;
    `;

	const VALUES = [data.points_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateUserPointsRelById(data) {
	const SQLQUERY = `
        UPDATE UserPointsRel
        SET user_id = ?, points = ?, last_updated = ?
        WHERE points_id = ?; 
    `;

	const VALUES = [data.user_id, data.points, data.last_updated, data.points_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updatePointsByUserId(data) {
	const SQLQUERY = `
        UPDATE UserPointsRel
        SET points = ?, last_updated = ?
        WHERE user_id = ?;
    `;

	const VALUES = [data.points, data.last_updated, data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteUserPointsRelById(data) {
	const SQLQUERY = `
        DELETE FROM UserPointsRel
        WHERE points_id = ?;

        ALTER TABLE UserPointsRel AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.points_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteUserPointsRelByUserId(data) {
	const SQLQUERY = `
        DELETE FROM UserPointsRel
        WHERE user_id = ?;

        ALTER TABLE UserPointsRel AUTO-_INCREMENT = 1;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewUserPointRel,
	selectAllUserPointsRel,
	selectUserPointsRelById,
	selectUserPointsRelByUserId,
	updateUserPointsRelById,
	updatePointsByUserId,
	deleteUserPointsRelById,
	deleteUserPointsRelByUserId,
};
