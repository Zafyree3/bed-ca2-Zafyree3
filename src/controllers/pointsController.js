const pointsModel = require("../models/pointsModel");
const moment = require("moment");

async function readPoints(req, res, next) {
	// Read all points
	let results = await pointsModel.selectAllUserPointsRel();

	res.status(200).json(results);
}

async function readPointsFromId(req, res, next) {
	// Read all points from ID
	const data = {
		points_id: req.params.id,
	};

	const results = await pointsModel.selectUserPointsRelById(data);

	res.status(200).json(results[0]);
}

async function addPointsByUserId(req, res, next) {
	// Add points from ID
	const data = {
		user_id: req.params.id || res.locals.userId,
		points: req.body.points,
	};

	const results = await pointsModel.addPointsByUserId(data);

	res.status(200).json(results);
}

async function readPointsFromUserId(req, res, next) {
	// Read all points from user ID
	const data = {
		user_id: req.params.id || res.locals.userId,
	};

	const results = await pointsModel.selectUserPointsRelByUserId(data);

	res.status(200).json(results[0]);
}

async function readPointsFromUserIdAndSaveToLocals(req, res, next) {
	// Read all points from user ID
	const data = {
		user_id: req.params.id || res.locals.userId,
	};

	const results = await pointsModel.selectUserPointsRelByUserId(data);

	console.log(results);

	res.locals.points = results[0].points;
	next();
}

async function updateUserPointsRelFromId(req, res, next) {
	// Update points from ID
	if (
		req.body.user_id == undefined &&
		req.body.points == undefined &&
		req.body.last_updated == undefined
	) {
		res.status(400).json({
			error: "Please ensure the request body contains an user_id and points",
		});
		return;
	}

	let pointsData = await pointsModel.selectUserPointsRelById({
		points_id: req.params.id,
	});
	pointsData = pointsData[0];

	// Check if the user_id, points, and last_updated are added
	if (req.body.user_id != undefined) {
		pointsData.user_id = req.body.user_id;
	}

	if (req.body.points != undefined) {
		pointsData.points = req.body.points;
	}

	if (req.body.last_updated != undefined) {
		pointsData.last_updated = req.body.last_updated;
	}

	// checks that data is formatted right
	const DATEFROMATREGEX = /^\d{4}-\d{2}-\d{2}$/;
	const formatRegex = new RegExp(DATEFROMATREGEX);

	const CAPTUREREGEX = /(\d{4})-(\d{2})-(\d{2})/;
	let match = ownedData.date_owned.match(CAPTUREREGEX);
	// Check if the date is formatted correctly
	if (parseInt(match[2]) > 12 || parseInt(match[2]) < 0) {
		res.status(400).json({
			error: "Please ensure the date_owned follows a format YYYY/MM/DD",
		});
		return;
	}

	let daysInMonth = new Date(
		parseInt(match[1]),
		parseInt(match[2]),
		0
	).getDate();

	if (parseInt(match[3]) > daysInMonth || parseInt(match[3]) < 1) {
		res.status(400).json({
			error: "Please ensure the date_owned follows a format YYYY/MM/DD",
		});
		return;
	}

	const results = await pointsModel.updateUserPointsRelById(pointsData);

	if (results.affectedRows == 0) {
		res.status(400).json({
			error: "Please ensure the request body contains an user_id and points",
		});
		return;
	}

	res.status(200).json(pointsData);
}

async function updatePointsByUserId(req, res, next) {
	let data = {
		user_id: req.params.id,
		points: req.body.points,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.data.user_id,
			points: res.locals.data.userPoints,
		};

		data.points = data.points - res.locals.data.price;
	}

	res.locals.data.userPoints = data.points;

	console.log(data);

	const results = await pointsModel.updatePointsByUserId(data);

	if (res.locals.next) {
		next();
		return;
	}

	res.status(200).json({
		user_id: data.user_id,
		points: data.points,
	});
}

async function createUserPointsRel(req, res, next) {
	// Create points
	if (
		req.body.user_id == undefined &&
		req.body.points == undefined &&
		req.body.last_updated == undefined
	) {
		res.status(400).json({
			error: "Please ensure the request body contains an user_id and points",
		});
		return;
	}

	const data = {
		user_id: req.body.user_id,
		points: req.body.points,
		last_updated: moment().format("YYYY-MM-DD"),
	};

	const results = await pointsModel.insertNewUserPointsRel(data);

	if (results.errno != undefined) {
		res.status(400).json({
			error: results.sqlMessage,
		});
	}

	if (results.affectedRows == 0) {
		res.status(400).json({
			error: "Cannot create new item",
		});
		return;
	}

	res.status(201).json({
		...data,
	});
}

async function createUserPointsRelRegister(req, res, next) {
	const data = {
		user_id: res.locals.userId,
		points: 0,
		last_updated: moment().format("YYYY-MM-DD"),
	};

	const results = await pointsModel.insertNewUserPointRel(data);

	if (results.errno != undefined) {
		res.status(400).json({
			error: results.sqlMessage,
		});
	}

	if (results.affectedRows == 0) {
		res.status(400).json({
			error: "Cannot create new item",
		});
		return;
	}

	next();
}

async function deleteUserPointsRelById(req, res, next) {
	const data = {
		points_id: req.params.id,
	};

	const results = await pointsModel.deleteUserPointsRelById(data);

	if (results.affectedRows == 0) {
		res.status(400).json({
			error: "Cannot delete item",
		});
		return;
	}

	res.sendStatus(204);
}

async function deleteUserPointsRelByUserId(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	const results = await pointsModel.deleteUserPointsRelByUserId(data);

	if (results.affectedRows == 0) {
		res.status(400).json({
			error: "Cannot delete item",
		});
		return;
	}

	res.sendStatus(204);
}

async function checkIfUserIdExist(req, res, next) {
	const userData = await pointsModel.selectAllUserPointsRel();

	let data = {
		user_id: req.params.id || res.locals.userId,
	};

	if (userData.findIndex((points) => points.user_id == data.user_id) == -1) {
		res.status(404).json({
			error: `Cannot find user with id ${data.user_id}`,
		});
		return;
	}

	next();
}

async function checkIfPointsIsEnuf(req, res, next) {
	let data = {
		user_id: req.params.id || res.locals.userId,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.data.user_id,
		};
	}

	const pointsData = await pointsModel.selectUserPointsRelByUserId(data);

	res.locals.data.userPoints = pointsData[0].points;

	if (res.locals.data.price > pointsData[0].points) {
		res.status(406).json({
			error: `Not enough points`,
		});
		return;
	}

	next();
}

module.exports = {
	readPoints,
	readPointsFromId,
	readPointsFromUserId,
	updateUserPointsRelFromId,
	createUserPointsRel,
	deleteUserPointsRelById,
	deleteUserPointsRelByUserId,
	checkIfUserIdExist,
	updatePointsByUserId,
	checkIfPointsIsEnuf,
	readPointsFromUserIdAndSaveToLocals,
	addPointsByUserId,
	createUserPointsRelRegister
};
