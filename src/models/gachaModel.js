const pool = require("../services/db");

async function insertNewGacha(data) {
	const SQLQUERY = `
        INSERT INTO Gacha (name, price, description)
        VALUES (?, ?, ?);
    `;

	const VALUES = [data.name, data.price, data.description];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllGacha() {
	const SQLQUERY = `
        SELECT * FROM Gacha
        ORDER BY Gacha.box_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectGachaById(data) {
	const SQLQUERY = `
        SELECT * FROM Gacha
        WHERE box_id = ?;
    `;

	const VALUES = [data.box_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateGachaById(data) {
	const SQLQUERY = `
        UPDATE Gacha
        SET name = ?, price = ?, description = ?
        WHERE box_id = ?;
    `;

	const VALUES = [data.name, data.price, data.description, data.box_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteGachaById(data) {
	const SQLQUERY = `
        DELETE FROM Gacha
        WHERE box_id = ?;

        ALTER TABLE Gacha AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.box_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewGacha,
	selectAllGacha,
	selectGachaById,
	updateGachaById,
	deleteGachaById,
};
