const fs = require("fs");
const csvParser = require("csv-parser");
const taskModel = require("../models/taskModel.js");

fs.createReadStream("./tasks.csv") // reads the file
	.pipe(csvParser())
	.on("data", async (data) => {
		data.points = +data.points; // converts points from strings to ints
		await taskModel
			.insertNewTask(data)
			.then((header) =>
				console.log(`Inserted ${data.title} at task_id:${header.insertId}`)
			); // prints what task_id is title
	})
	.on("end", async () => {
		await taskModel.selectAllTasks().then((header) => console.log(header)); // prints what has been added
		process.exit();
	});
