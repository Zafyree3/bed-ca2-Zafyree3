const fs = require("fs");
const csvParser = require("csv-parser");
const pointsModel = require("../models/pointsModel.js");

const insertAllData = require("../functions/insertAllData.js");

let dataList = [];

fs.createReadStream("src/data/userPointsRel.csv")
	.pipe(csvParser())
	.on("data", (data) => dataList.push(data))
	.on("end", async () => {
		await insertAllData(
			dataList,
			"Points",
			true,
			pointsModel.insertNewUserPointRel,
			pointsModel.selectAllUserPointsRel
		);
		process.exit();
	});
