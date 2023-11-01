const pool = require("../services/db");

async function insertNewAbility(data) {
	const SQLQUERY = `
        INSERT INTO Ability (action, description)
        VALUES (?,?);
    `;

	const VALUES = [data.action, data.description];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllAbilities() {
	const SQLQUERY = `
        SELECT * FROM Ability
        ORDER BY Ability.ability_id;
    `;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectAbilityById(data) {
	const SQLQUERY = `
        SELECT * FROM Ability
        WHERE ability_id = ?;
    `;

	const VALUES = [data.ability_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function updateAbilityById(data) {
	const SQLQUERY = `
        UPDATE Ability
        SET action = ?, description = ?
        WHERE ability_id = ?;
`;

	const VALUES = [data.action, data.description, data.ability_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function deleteAbilityById(data) {
	const SQLQUERY = `
        DELETE FROM Ability
        WHERE ability_id = ?;

        ALTER TABLE Ability AUTO_INCREMENT = 1;
    `;

	const VALUES = [data.ability_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

module.exports = {
	insertNewAbility,
	selectAllAbilities,
	selectAbilityById,
	updateAbilityById,
	deleteAbilityById,
};
