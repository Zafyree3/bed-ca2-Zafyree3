const pool = require("../services/db");

async function insertNewItem(data) {
	const SQLQUERY = `
        INSERT INTO Item (item_num, name, price, description, ability_id)
        VALUES (?,?,?,?,?)
    `;

	const VALUES = [
		data.item_num,
		data.name,
		data.price,
		data.description,
		data.ability_id,
	];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllItems() {
	const SQLQUERY = `
		SELECT * FROM Item
		ORDER BY Item.item_num;
	`;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectItemById(data) {
	const SQLQUERY = `
		SELECT * FROM Item
		WHERE item_num = ?;
	`;

	const VALUES = [data.item_num];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateItemById(data) {
	const SQLQUERY = `
		UPDATE Item
		SET name = ?, price = ?, description = ?, ability_id = ?
		WHERE item_num = ?;
	`;

	const VALUES = [
		data.item_name,
		data.item_price,
		data.item_description,
		data.ability_id,
		data.item_num,
	];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteItemById(data) {
	const SQLQUERY = `
		DELETE FROM Item
		WHERE item_num = ?;

		ALTER TABLE Item AUTO_INCREMENT = 1;
	`;

	const VALUES = [data.item_num];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewItem,
	selectAllItems,
	selectItemById,
	updateItemById,
	deleteItemById,
};
