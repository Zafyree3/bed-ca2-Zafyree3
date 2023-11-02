const fs = require("fs");
const csvParser = require("csv-parser");
const dropModel = require("../models/dropModel.js");

const insertAllData = require("../functions/insertAllData.js");

let dropList = [];

fs.createReadStream("src/data/gachaDrops.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => dropList.push(data))
	.on("end", async () => {
		await insertAllData(
			dropList,
			"GachaDrop",
			true,
			dropModel.insertNewGachaCat,
			dropModel.selectAllGachaCat
		);
		process.exit();
	});
