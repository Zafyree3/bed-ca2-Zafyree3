const fs = require("fs");
const csvParser = require("csv-parser");
const messagesModel = require("../models/messagesModel.js");

const insertAllData = require("../functions/insertAllData.js");

let messagesList = [];

fs.createReadStream("src/data/messages.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => messagesList.push(data))
	.on("end", async () => {
		await insertAllData(
			messagesList,
			"Messages",
			true,
			messagesModel.insertSingle,
			messagesModel.selectAll
		);
		process.exit();
	});
