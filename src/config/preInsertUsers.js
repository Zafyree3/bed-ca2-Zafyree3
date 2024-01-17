const fs = require("fs");
const csvParser = require("csv-parser");
const userModel = require("../models/userModel.js");

const insertAllData = require("../functions/insertAllData.js");

const bcrypt = require("bcrypt");
const saltRounds = 10;

let dataList = [];

fs.createReadStream("src/data/users.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => {
		dataList.push(data);
	})
	.on("end", async () => {
		for (let i = 0; i < dataList.length; i++) {
			const hashedPassword = await bcrypt.hash(
				dataList[i].password,
				saltRounds
			);
			dataList[i].password = hashedPassword;
		}
		await insertAllData(
			dataList,
			"User",
			true,
			userModel.insertNewUser,
			userModel.selectAllUsers
		);
		process.exit();
	});
