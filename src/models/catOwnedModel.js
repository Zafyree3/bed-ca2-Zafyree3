const pool = require("../services/db");

async function countAllCatOwned() {
	const SQLQUERY = `
		SELECT COUNT(*) AS total FROM CatOwned;
	`;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function insertNewCatOwned(data) {
	const SQLQUERY = `
        INSERT INTO CatOwned (cat_name, owner_id,cat_num,date_owned)
        VALUES (?,?,?,?)
    `;

	const VALUES = [data.cat_name, data.owner_id, data.cat_num, data.date_owned];

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

async function selectAllCatOwnedDetail() {
	// Combine CatOwned, User, Cat, Ability to give detailed of all cats
	const SQLQUERY = `
		SELECT cat_id, cat_name, owner_id, User.username AS owner_username, Cat.cat_num, Cat.breed AS cat_breed, Ability.action AS ability_action, Ability.description AS ability_description FROM CatOwned
		INNER JOIN User ON User.user_id = CatOwned.owner_id
		INNER JOIN Cat ON Cat.cat_num = CatOwned.cat_num
		INNER JOIN Ability ON Ability.ability_id = Cat.ability_id;
	`;

	const [header, _] = await pool.query(SQLQUERY);

	return header;
}

async function selectAllCatOwnedDetailById(data) {
	// Same as above, however only get by cat_id
	const SQLQUERY = `
		SELECT cat_id, cat_name, owner_id, User.username AS owner_username, Cat.cat_num, Cat.breed AS cat_breed, Ability.action AS ability_action, Ability.description AS ability_description FROM CatOwned
		INNER JOIN User ON User.user_id = CatOwned.owner_id
		INNER JOIN Cat ON Cat.cat_num = CatOwned.cat_num
		INNER JOIN Ability ON Ability.ability_id = Cat.ability_id
		WHERE cat_id = ?;
	`;

	const VALUES = [data.cat_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

	return header;
}

async function selectAllCatOwnedDetailByOwnerId(data) {
	// Full deatils of all cats owned by a user
	const SQLQUERY = `
		SELECT cat_id, cat_name, owner_id, User.username AS owner_username, Cat.cat_num, Cat.breed AS cat_breed, Ability.action AS ability_action, Ability.description AS ability_description FROM CatOwned
		INNER JOIN User ON User.user_id = CatOwned.owner_id
		INNER JOIN Cat ON Cat.cat_num = CatOwned.cat_num
		INNER JOIN Ability ON Ability.ability_id = Cat.ability_id
		WHERE owner_id = ?;
	`;

	const VALUES = [data.owner_id];

	const [header, _] = await pool.query(SQLQUERY, VALUES);

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
        SET cat_name = ?, owner_id = ?, cat_num = ?, date_owned = ?
        WHERE cat_id = ?;
`;

	const VALUES = [
		data.cat_name,
		data.owner_id,
		data.cat_num,
		data.date_owned,
		data.cat_id,
	];

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
	selectAllCatOwnedDetail,
	selectAllCatOwnedDetailById,
	selectAllCatOwnedDetailByOwnerId,
	countAllCatOwned,
};
