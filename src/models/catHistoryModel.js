const pool = require("../services/db");

async function insertNewCatHistory(data) {
	const SQLQUERY = `
        INSERT INTO CatHistory (owner_id,prev_owner_id,cat_id,date_occured)
        VALUES (?,?,?,?)
    `;

	const VALUES = [
		data.owner_id,
		data.prev_owner_id,
		data.cat_id,
		data.date_occured,
	];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllCatHistory() {
	const SQLQUERY = `
        SELECT * FROM CatHistory
        ORDER BY CatHistory.hist_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectCatHistoryById(data) {
	const SQLQUERY = `
        SELECT * FROM CatHistory
        WHERE hist_id = ?;
    `;

	const VALUES = [data.hist_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateCatHistoryById(data) {
	const SQLQUERY = `
        UPDATE CatHistory
        SET owner_id = ?, prev_owner_id = ?, cat_id = ?, date_occured = ?
        WHERE hist_id = ?;
`;

	const VALUES = [
		data.owner_id,
		data.prev_owner_id,
		data.cat_id,
		data.date_occured,
		data.hist_id,
	];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteCatHistoryById(data) {
	const SQLQUERY = `
        DELETE FROM CatHistory
        WHERE hist_id = ?;

        ALTER TABLE CatHistory AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.hist_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewCatHistory,
	selectAllCatHistory,
	selectCatHistoryById,
	updateCatHistoryById,
	deleteCatHistoryById,
};
