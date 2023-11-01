const pool = require("../services/db");

async function insertNewCatOwned(data) {
	const SQLQUERY = `
        INSERT INTO CatOwned (owner_id,cat_num,date_owned)
        VALUES (?,?,?)
    `;

	const VALUES = [data.owner_id, data.cat_num, data.date_owned];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllCatOwned() {
	const SQLQUERY = `
        SELECT * FROM CatOwned
        ORDER BY CatOwned.cat_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectCatOwnedById(data) {
	const SQLQUERY = `
        SELECT * FROM CatOwned
        WHERE cat_id = ?;
    `;

	const VALUES = [data.cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateCatOwnedById(data) {
	const SQLQUERY = `
        UPDATE CatOwned
        SET owner_id = ?, cat_num = ?, date_owned = ?
        WHERE cat_id = ?;
`;

	const VALUES = [data.owner_id, data.cat_num, data.date_owned, data.cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteCatOwnedById(data) {
	const SQLQUERY = `
        DELETE FROM CatOwned
        WHERE cat_id = ?;

        ALTER TABLE CatOwned AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewCatOwned,
	selectAllCatOwned,
	selectCatOwnedById,
	updateCatOwnedById,
	deleteCatOwnedById,
};
