const fs = require("fs");
const csvParser = require("csv-parser");
const abilityModel = require("../models/abilityModel.js");

const insertAllData = require("../functions/insertAllData.js");

let abilityList = [];

fs.createReadStream("src/data/abilities.csv") // reads the file
	.pipe(csvParser()) // parses the file into a JSON object
	.on("data", (row) => {
		abilityList.push(row);
	})
	.on("end", async () => {
		await insertAllData(
			abilityList,
			"Ability",
			true,
			abilityModel.insertNewAbility,
			abilityModel.selectAllAbilities
		);
		process.exit();
	});
