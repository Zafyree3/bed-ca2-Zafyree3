const fs = require("fs");
const csvParser = require("csv-parser");
const gachaModel = require("../models/gachaModel.js");

const insertAllData = require("../functions/insertAllData.js");

let gachaList = [];

fs.createReadStream("src/data/gachas.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => gachaList.push(data))
	.on("end", async () => {
		await insertAllData(
			gachaList,
			"Gacha",
			true,
			gachaModel.insertNewGacha,
			gachaModel.selectAllGachas
		);
		process.exit();
	});
