const pool = require("../services/db");

async function insertNewCat(data) {
	const SQLQUERY = `
        INSERT INTO Cat (cat_num,breed,ability_id)
        VALUES (?,?,?)
    `;

	const VALUES = [data.cat_num, data.breed, data.ability_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllCats() {
	const SQLQUERY = `
        SELECT * FROM Cat
        ORDER BY Cat.cat_num;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectCatById(data) {
	const SQLQUERY = `
        SELECT * FROM Cat
        WHERE cat_num = ?;
    `;

	const VALUES = [data.cat_num];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateCatById(data) {
	const SQLQUERY = `
        UPDATE Cat
        SET breed = ?, ability_id = ?
        WHERE cat_num = ?;
`;

	const VALUES = [data.breed, data.ability_id, data.cat_num];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteCatById(data) {
	const SQLQUERY = `
        DELETE FROM Cat
        WHERE cat_num = ?;

        ALTER TABLE Cat AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.cat_num];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewCat,
	selectAllCats,
	selectCatById,
	updateCatById,
	deleteCatById,
};
