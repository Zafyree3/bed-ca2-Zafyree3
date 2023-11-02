const fs = require("fs");
const csvParser = require("csv-parser");
const catModel = require("../models/catModel.js");

const insertAllData = require("../functions/insertAllData.js");

let catList = [];

fs.createReadStream("src/data/cats.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => catList.push(data))
	.on("end", async () => {
		await insertAllData(
			catList,
			"Cat",
			true,
			catModel.insertNewCat,
			catModel.selectAllCats
		);
		process.exit();
	});
