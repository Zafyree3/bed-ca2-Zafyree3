const taskModel = require("../models/taskModel");

async function readTasks(req, res, next) {
	const results = await taskModel.selectAllTasks();

	res.status(200).json(results);
}

async function createTask(req, res, next) {
	if (
		req.body.title == undefined ||
		req.body.description == undefined ||
		req.body.points == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains a title, description and points",
		});
		return;
	}

	const data = {
		title: req.body.title,
		description: req.body.description,
		points: req.body.points,
	};

	const results = await taskModel.insertNewTask(data);

	res.status(201).json({
		task_id: results.insertId,
		...data,
	});
}

module.exports = {
	readTasks,
	createTask,
};
