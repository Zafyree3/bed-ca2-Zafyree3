const fs = require("fs");
const csvParser = require("csv-parser");
const itemModel = require("../models/itemModel");

const insertAllData = require("../functions/insertAllData.js");

let dataList = [];

fs.createReadStream("src/data/items.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => {
		dataList.push(data);
	})
	.on("end", async () => {
		await insertAllData(
			dataList,
			"Item",
			true,
			itemModel.insertNewItem,
			itemModel.selectAllItems
		);
		process.exit();
	});
