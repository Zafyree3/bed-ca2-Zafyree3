const pool = require("../services/db");

async function insertNewItemOwned(data) {
	const SQLQUERY = `
        INSERT INTO ItemOwned (item_num, owner_id, quantity)
		VALUES (?,?,?);
	`;

	const VALUES = [data.item_num, data.owner_id, data.quantity];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllItemOwned() {
	const SQLQUERY = `
		SELECT * FROM ItemOwned
		ORDER BY ItemOwned.item_id;
	`;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectItemOwnedById(data) {
	const SQLQUERY = `
		SELECT * FROM ItemOwned
		WHERE item_id = ?;
	`;

	const VALUES = [data.item_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateItemOwnedById(data) {
	const SQLQUERY = `
		UPDATE ItemOwned
		SET item_num = ?, owner_id = ?, quantity = ?
		WHERE item_id = ?;
	`;

	const VALUES = [data.item_num, data.owner_id, data.quantity, data.item_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteItemOwnedById(data) {
	const SQLQUERY = `
		DELETE FROM ItemOwned
		WHERE item_id = ?;

		ALTER TABLE ItemOwned AUTO_INCREMENT = 1;
	`;

	const VALUES = [data.item_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewItemOwned,
	selectAllItemOwned,
	selectItemOwnedById,
	updateItemOwnedById,
	deleteItemOwnedById,
};
