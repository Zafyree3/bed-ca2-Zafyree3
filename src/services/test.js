// This is a testing script to test different things

const db = require("../services/db");

async function selectAllCatOwnedMod() {
	const SQLQUERY = `
        SELECT ?? FROM CatOwned
        INNER JOIN Cat ON Cat.cat_num = CatOwned.cat_num
        INNER JOIN Ability ON Ability.ability_id = Cat.ability_id
        INNER JOIN User ON User.user_id = CatOwned.owner_id
        WHERE owner_id = ?;
    `;

	const VALUES = [data.columns, data.owner_id];

	const [header, _] = await db.query(SQLQUERY, VALUES);

	return header;
}

const data = {
	columns: ["cat_id", "cat_name AS name"],
	owner_id: 1,
};

selectAllCatOwnedMod(data).then((res) => {
	console.log(res);
	process.exit();
});
