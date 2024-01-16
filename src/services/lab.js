// This is a testing script to test different things

// ------------ Testing how to select columns from VALUES ------------
const db = require("./db");

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

/*
const data = {
	columns: ["cat_id", "cat_name"],
	owner_id: 1,
};

selectAllCatOwnedMod(data).then((res) => {
	console.log(res);
	process.exit();
});
*/

// ------------ Testing how to update 1 values ------------

async function updateCatOwnedMod(data) {
	// Data.set will be what to update
	// Fromat data.set such that the key-val pair becomes a string
	// The format of the string will be key = val with a comma at the end

	let setString = "";
	for (let key in data.set) {
		setString += `${key} = '${data.set[key]}',`;
	}

	// Remove the last comma
	setString = setString.slice(0, -1);

	const SQLQUERY = `
    UPDATE CatOwned
    SET ${setString}
    WHERE cat_id = ?;
    `;

	const VALUES = [data.cat_id];

	const [header, _] = await db.query(SQLQUERY, VALUES);

	return header;
}

const data = {
	cat_id: 1,
	set: {
		cat_name: "Maple",
	},
};

updateCatOwnedMod(data).then((res) => {
	console.log(res);
	process.exit();
});
