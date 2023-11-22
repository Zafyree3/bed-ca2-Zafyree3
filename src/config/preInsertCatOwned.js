const fs = require("fs");
const csvParser = require("csv-parser");
const catOwnedModel = require("../models/catOwnedModel.js");

const insertAllData = require("../functions/insertAllData.js");

let dataList = [];

fs.createReadStream("src/data/catOwned.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => dataList.push(data))
	.on("end", async () => {
		await insertAllData(
			dataList,
			"Owned",
			true,
			catOwnedModel.insertNewCatOwned,
			catOwnedModel.selectAllCatOwned
		);
		process.exit();
	});
