const fs = require("fs");
const csvParser = require("csv-parser");
const userModel = require("../models/userModel.js");

const insertAllData = require("../functions/insertAllData.js");

let dataList = [];

fs.createReadStream("src/data/users.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => dataList.push(data))
	.on("end", async () => {
		await insertAllData(
			dataList,
			"User",
			true,
			userModel.insertNewUser,
			userModel.selectAllUsers
		);
		process.exit();
	});
