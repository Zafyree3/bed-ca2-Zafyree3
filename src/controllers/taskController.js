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

async function readTasksFromId(req, res, next) {
	// TODO: make sure task exist
	const data = {
		task_id: req.params.id,
	};

	const results = await taskModel.selectTaskById(data);

	res.status(200).json(results[0]);
}

async function updateTaskFromId(req, res, next) {
	if (
		req.body.title == undefined &&
		req.body.description == undefined &&
		req.body.points == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains a title, description or points",
		});
		return;
	}

	const taskData = await taskModel.selectTaskById(data);

	const data = {
		task_id: req.params.id,
		title: req.body.title != undefined ? req.body.title : taskData.title,
		description:
			req.body.description != undefined
				? req.body.description
				: taskData.description,
		points: req.body.points != undefined ? req.body.points : taskData.points,
	};

	const results = await taskModel.updateTaskById(data);

	res.status(200).json(data);
}

async function deleteTaskFromId(req, res, next) {
	await taskModel.deleteTaskById(data);

	next();
}

async function checkIfTaskExist(req, res, next) {
	const tasksData = await taskModel.selectAllTasks();

	const data = {
		task_id: req.params.id,
	};

	if (tasksData.findIndex((task) => task.task_id == data.task_id) == -1) {
		res.status(404).json({ error: `Cannot find task with id ${data.user_id}` });
		return;
	}

	next();
}

module.exports = {
	readTasks,
	createTask,
	readTasksFromId,
	updateTaskFromId,
	deleteTaskFromId,
	checkIfTaskExist,
};
