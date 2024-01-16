const progressModel = require("../models/progressModel");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

async function deleteProgressFromUserId(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	await progressModel.deleteTaskProgressByUserId(data);

	res.sendStatus(204);
}

async function deleteProgressFromTaskId(req, res, next) {
	const data = {
		task_id: req.params.id,
	};

	await progressModel.deleteTaskProgressByUserId(data);

	res.sendStatus(204);
}

async function createProgress(req, res, next) {
	if (
		req.body.user_id == undefined ||
		req.body.task_id == undefined ||
		req.body.completion_date == undefined ||
		req.body.notes == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure that the request body contains an user_id, task_id, completion_date and notes",
		});
		return;
	}

	//console.log(req.body);

	const userData = await userModel.selectUserById({
		user_id: req.body.user_id,
	});

	if (userData.length == 0) {
		res.status(404).json({
			error: `Cannot find user with id ${req.body.user_id}`,
		});
		return;
	}

	const taskData = await taskModel.selectTaskById({
		task_id: req.body.task_id,
	});

	if (taskData.length == 0) {
		res.status(404).json({
			error: `Cannot find task with id ${req.body.task_id}`,
		});
		return;
	}

	const data = {
		task_id: req.body.task_id,
		user_id: req.body.user_id,
		completion_date: req.body.completion_date,
		notes: req.body.notes,
	};

	const results = await progressModel.insertNewTaskProgress(data);

	res.status(201).send({
		progress_id: results.insertId,
		...data,
	});
}

async function readProgress(req, res, next) {
	const results = await progressModel.selectAllTaskProgresses();

	res.status(200).json(results);
}

async function readProgressFromId(req, res, next) {
	const data = {
		progress_id: req.params.id,
	};

	const results = await progressModel.selectTaskProgressById(data);

	res.status(200).json(results[0]);
}

async function readProgressFromUserId(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	const results = await progressModel.selectTaskProgressByUserId(data);

	res.status(200).json(results);
}

async function updateProgressFromId(req, res, next) {
	if (
		req.body.task_id == undefined &&
		req.body.user_id == undefined &&
		req.body.completion_date == undefined &&
		req.body.notes == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains a task_id, user_id, completion_data or notes",
		});
		return;
	}

	let progressData = await progressModel.selectTaskProgressById({
		progress_id: req.params.id,
	});

	progressData = progressData[0];

	if (req.body.task_id != undefined) {
		progressData.task_id = req.body.task_id;
	}
	if (req.body.user_id != undefined) {
		progressData.user_id = req.body.user_id;
	}
	if (req.body.completion_date != undefined) {
		progressData.completion_date = req.body.completion_date;
	}
	if (req.body.notes != undefined) {
		progressData.notes = req.body.notes;
	}

	const results = await progressModel.updateTaskProgressById(progressData);

	res.status(200).json(progressData);
}

async function deleteProgressFromId(req, res, next) {
	await progressModel.deleteTaskProgressById({ progress_id: req.params.id });

	res.sendStatus(204);
}

async function checkIfProgressExist(req, res, next) {
	const progressData = await progressModel.selectAllTaskProgresses();

	const data = {
		progress_id: req.params.id,
	};

	if (
		progressData.findIndex(
			(progress) => progress.progress_id == data.progress_id
		) == -1
	) {
		res
			.status(404)
			.json({ error: `Cannot find task progress with id ${data.progress_id}` });
		return;
	}

	next();
}

module.exports = {
	deleteProgressFromUserId,
	deleteProgressFromTaskId,
	createProgress,
	readProgressFromId,
	updateProgressFromId,
	deleteProgressFromId,
	checkIfProgressExist,
	readProgressFromUserId,
	readProgress,
};
