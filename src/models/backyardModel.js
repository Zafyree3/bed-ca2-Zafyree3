const pool = require("../services/db");

async function insertNewBackyard(data) {
	// Insert new backyard into Backyard table
	const SQLQUERY = `
        INSERT INTO Backyard (user_id, name)
        VALUES (?, ?);
    `;

	const VALUES = [data.user_id, data.name];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllBackyards() {
	// Selects all backyards from Backyard table
	const SQLQUERY = `
        SELECT * FROM Backyard
        ORDER BY Backyard.backyard_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectBackyardById(data) {
	// Selects backyard by backyard_id from Backyard table
	const SQLQUERY = `
        SELECT * FROM Backyard
        WHERE backyard_id = ?;
    `;

	const VALUES = [data.backyard_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectBackyardByUserId(data) {
	// Selects backyard by user_id from Backyard table
	const SQLQUERY = `
        SELECT * FROM Backyard
        WHERE user_id = ?;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateBackyardById(data) {
	// Updates backyard by backyard_id from Backyard table
	const SQLQUERY = `
        UPDATE Backyard
        SET user_id = ?, name = ?
        WHERE backyard_id = ?;
    `;

	const VALUES = [data.user_id, data.name, data.backyard_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteBackyardById(data) {
	// Deletes backyard by backyard_id from Backyard table
	const SQLQUERY = `
        DELETE FROM Backyard
        WHERE backyard_id = ?;
    `;

	const VALUES = [data.backyard_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteBackyardByUserId(data) {
	// Deletes backyard by user_id from Backyard table
	const SQLQUERY = `
        DELETE FROM Backyard
        WHERE user_id = ?;
    `;

	const VALUES = [data.user_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewBackyard,
	selectAllBackyards,
	selectBackyardById,
	selectBackyardByUserId,
	updateBackyardById,
	deleteBackyardById,
	deleteBackyardByUserId,
};
