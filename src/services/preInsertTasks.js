const fs = require("fs");
const csvParser = require("csv-parser");
const taskModel = require("src/models/taskModel.js");

const insertAllData = require("src/functions/insertAllData.js");

let taskList = [];

fs.createReadStream("src/data/tasks.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => taskList.push(data))
	.on("end", async () => {
		await insertAllData(
			taskList,
			"Task",
			true,
			taskModel.insertNewTask,
			taskModel.selectAllTasks
		);
		process.exit();
	});
