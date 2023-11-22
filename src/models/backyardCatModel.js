const pool = require("../services/db");

async function inserNewBackyardCatRel(data) {
	// Insert new rel into BackyardCatRel table
	const SQLQUERY = `
        INSERT INTO BackyardCatRel (backyard_id,cat_id,date_added)
        VALUES (?,?,?);
    `;

	const VALUES = [data.backyard_id, data.cat_id, data.date_added];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllBackyardCatRel() {
	// Selects all rels from BackyardCatRel table
	const SQLQUERY = `
        SELECT * FROM BackyardCatRel
        ORDER BY BackyardCatRel.backyard_cat_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectBackyardCatRelById(data) {
	// Selects rel by backyard_cat_id from BackyardCatRel table
	const SQLQUERY = `
        SELECT * FROM BackyardCatRel
        WHERE backyard_cat_id = ?;
    `;

	const VALUES = [data.backyard_cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectBackyardCatRelByBackyardId(data) {
	// Selects rel by backyard_id from BackyardCatRel table
	const SQLQUERY = `
        SELECT * FROM BackyardCatRel
        WHERE backyard_id = ?;
    `;

	const VALUES = [data.backyard_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateBackyardCatRelById(data) {
	// Updates rel by backyard_cat_id from BackyardCatRel table
	const SQLQUERY = `
        UPDATE BackyardCatRel
        SET backyard_id = ?, cat_id = ?, date_added = ?
        WHERE backyard_cat_id = ?; 
    `;

	const VALUES = [
		data.backyard_id,
		data.cat_id,
		data.date_added,
		data.backyard_cat_id,
	];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteBackyardCatRelById(data) {
	// Deletes rel by backyard_cat_id from BackyardCatRel table
	const SQLQUERY = `
        DELETE FROM BackyardCatRel
        WHERE backyard_cat_id = ?;
    `;

	const VALUES = [data.backyard_cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	inserNewBackyardCatRel,
	selectAllBackyardCatRel,
	selectBackyardCatRelById,
	selectBackyardCatRelByBackyardId,
	updateBackyardCatRelById,
	deleteBackyardCatRelById,
};
