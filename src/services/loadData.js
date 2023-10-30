const fs = require("fs");
const csvParser = require("csv-parser");
const taskModel = require("../SQL/models/taskModel.js");

let csvData = [];

const callback = (error, results, fields) => {
	if (error) {
		console.error(error);
	}
};

fs.createReadStream("./src/SQL/tasks.csv") // reads the file
	.pipe(csvParser())
	.on("data", (data) => csvData.push(data)) // push each row to csvData
	.on("end", () => {
		csvData.forEach((data) => {
			// map thru each value in csvData and adds it to Task Table
			data.points = +data.points; // convert it to int
			taskModel.insertNewTask(data, callback);
		});
	});
