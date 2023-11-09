const pool = require("../services/db");

async function insertNewGachaCat(data) {
	const SQLQUERY = `
        INSERT INTO GachaDrop (cat_num, gacha_id, chance)
        VALUES (?, ?, ?);
    `;

	const VALUES = [data.cat_num, data.gacha_id, data.chance];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllGachaCat() {
	const SQLQUERY = `
        SELECT * FROM GachaDrop
        ORDER BY GachaDrop.drop_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectGachaCatById(data) {
	const SQLQUERY = `
        SELECT * FROM GachaDrop
        WHERE drop_id = ?;
    `;

	const VALUES = [data.drop_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectGachaCatByGachaId(data) {
	const SQLQUERY = `
		SELECT Cat.breed, Ability.description FROM GachaDrop
		INNER JOIN Cat ON GachaDrop.cat_num = Cat.cat_num
		INNER JOIN Ability ON Cat.ability_id = Ability.ability_id
		WHERE gacha_id = ?;
	`;

	const VALUES = [data.gacha_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateGachaCatById(data) {
	const SQLQUERY = `
        UPDATE GachaDrop
        SET cat_num = ?, gacha_id = ?, chance = ?
        WHERE drop_id = ?;
    `;

	const VALUES = [data.cat_num, data.gacha_id, data.chance, data.drop_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteGachaCatById(data) {
	const SQLQUERY = `
        DELETE FROM GachaDrop
        WHERE drop_id = ?;

        ALTER TABLE GachaDrop AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.drop_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteGachaCatByGachaId(data) {
	const SQLQUERY = `
		DELETE FROM GachaDrop
		WHERE gacha_id = ?;

		ALTER TABLE GachaDrop AUTO_INCREMENT = 1;
	`;

	const VALUES = [data.gacha_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectRandomGachaCatByGachaId(data) {
	const SQLQUERY = `
		ALTER TABLE GachaDrop
		ADD prob_sum float;
		
		UPDATE GachaDrop
		SET prob_sum = (RAND() * chance)
		WHERE gacha_id = ?;
		
		SELECT * FROM GachaDrop	
		WHERE prob_sum in 
		(
		SELECT MAX(prob_sum) from GachaDrop
		);
		
		ALTER TABLE GachaDrop
		DROP COLUMN prob_sum;
	`;

	const VALUES = [data.gacha_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewGachaCat,
	selectAllGachaCat,
	selectGachaCatById,
	updateGachaCatById,
	deleteGachaCatById,
	selectGachaCatByGachaId,
	deleteGachaCatByGachaId,
	selectRandomGachaCatByGachaId,
};
