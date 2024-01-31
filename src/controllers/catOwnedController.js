const catOwnedModel = require("../models/catOwnedModel");
const moment = require("moment");

async function catOwnedCount(req, res, next) {
	const results = await catOwnedModel.countAllCatOwned();

	res.status(200).json(results[0]);
}

async function addCatOwned(req, res, next) {
	// TODO: FIX THIS, ALREADY HAVE ANOTHER FUCTIOSN CALLED CREATEDCATOWNED
	let data = {
		cat_num: req.body.cat_num,
		owner_id: req.body.id || res.locals.userId,
		cat_name: req.body.cat_name,
		date_owned: moment(Date.now()).format("YYYY-MM-DD"), // Add the current date time
	};

	if (res.locals.next) {
		data = {
			cat_num: res.locals.data.cat_num,
			owner_id: res.locals.data.user_id,
			cat_name: req.body.cat_name || res.locals.data.cat_name || "Cat",
			date_owned: moment(Date.now()).format("YYYY-MM-DD"), // Add the current date time
		};
	}

	console.log(data);

	const results = await catOwnedModel.insertNewCatOwned(data);

	res.status(201).send({
		cat_owned_id: results.insertId,
		...data,
	});

	next();
}

async function readCatOwned(req, res, next) {
	// Read all cats owned
	let results = await catOwnedModel.selectAllCatOwned();

	res.status(200).json(results);
}

async function readCatOwnedDetails(req, res, next) {
	// Read all cats owned with cat specific details
	let results = await catOwnedModel.selectAllCatOwnedDetail();

	res.status(200).json(results);
}

async function readCatOwnedDetailsFromId(req, res, next) {
	// Read all cats owned with cat specific details From ID
	const data = {
		cat_id: req.params.id,
	};

	let results = await catOwnedModel.selectAllCatOwnedDetailById(data);

	res.status(200).json(results[0]);
}

async function readCatOwnedDetailsFromOwnerId(req, res, next) {
	// Read all cats owned with details From OwnerId

	const data = {
		owner_id: req.params.id || res.locals.userId,
	};

	let results = await catOwnedModel.selectAllCatOwnedDetailByOwnerId(data);

	res.status(200).json(results);
}

async function createCatOwned(req, res, next) {
	// Create new cat owned
	if (
		// Checks that these is cat_num, cat_name, owner_id
		req.body.cat_num == undefined ||
		req.body.cat_name == undefined ||
		req.body.owner_id == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains a cat_num, cat_name, and owner_id",
		});
		return;
	}

	const data = {
		cat_num: req.body.cat_num,
		cat_name: req.body.cat_name,
		owner_id: req.body.owner_id,
		date_owned: moment(Date.now()).format("YYYY-MM-DD"), // Add the current date time
	};

	let results = await catOwnedModel.insertNewCatOwned(data);

	if (results.errno != undefined) {
		// If there is an error, display it
		res.status(400).json({ error: results.sqlMessage });
		return;
	}

	if (results.affectedRows == 0) {
		// if there was no update to the table
		res.status(400).json({ error: "Cannot create new item" });
		return;
	}

	res.status(201).json({
		...data,
		cat_id: results.insertId,
	});
}

async function updateCatOwnedFromId(req, res, next) {
	// Update cat owned data
	if (
		// Checks that these is cat_num, cat_name, owner_id
		req.body.cat_num == undefined &&
		req.body.cat_name == undefined &&
		req.body.owner_id == undefined &&
		req.body.date_owned == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains a cat_num, cat_name, date_owned, or owner_id",
		});
		return;
	}

	console.log(req.params.id);

	let ownedData = await catOwnedModel.selectCatOwnedById({
		cat_id: req.params.id,
	});

	console.log(ownedData);

	ownedData = ownedData[0];

	if (req.body.cat_name != undefined) {
		ownedData.cat_name = req.body.cat_name;
	}

	if (req.body.owner_id != undefined) {
		ownedData.owner_id = req.body.owner_id;
	}

	if (req.body.cat_num != undefined) {
		ownedData.cat_num = req.body.cat_num;
	}

	if (req.body.date_owned != undefined) {
		ownedData.date_owned = req.body.date_owned;
	}

	const newTimestamp = new Date(ownedData.date_owned).getTime();

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	if (!isNumeric(newTimestamp)) {
		res.status(400).json({
			error:
				"Please ensure the date_owned follows a format YYYY-MM-DD HH:MM:SS",
		});
		return;
	}

	// const DATEFROMATREGEX = /\d{4}\/\d{2}\/\d{2}/; // This regex check for 4 digits, /, 2 digits, / 2 digits
	// const formatRegex = new RegExp(DATEFROMATREGEX);

	// // Process the date, checks if follows the format
	// if (!formatRegex.test(ownedData.date_owned)) {
	// 	res.status(400).json({
	// 		error: "Please ensure the date_owned follows a format YYYY/MM/DD",
	// 	});
	// 	return;
	// }

	// // Checks if the values is correct
	// const CAPTUREREGEX = /(\d{4})\/(\d{2})\/(\d{2})/;
	// let match = ownedData.date_owned.match(CAPTUREREGEX);
	// /// match[1] = year, match[2] = month, match[3] = date
	// if (parseInt(match[2]) > 12 || parseInt(match[2]) < 0) {
	// 	// Checks that the months is < 12 and > 0
	// 	res.status(400).json({
	// 		error: "Please ensure the the months is from 01 - 12",
	// 	});
	// 	return;
	// }

	// let daysInMonth = new Date(
	// 	parseInt(match[1]),
	// 	parseInt(match[2]),
	// 	0
	// ).getDate();

	// if (parseInt(match[3]) < 1 || parseInt(match[3]) > daysInMonth) {
	// 	res.status(400).json({
	// 		error: " Please ensure that the numbers of days is correct",
	// 	});
	// 	return;
	// }

	const results = await catOwnedModel.updateCatOwnedById(ownedData);

	if (results.affectedRows == 0) {
		// Checks whether the rows is affects
		res.status(409).json({
			error: `Could not update the data for id: ${req.params.id}`,
		});
		return;
	}

	res.status(200).json(ownedData);
}

async function deleteCatOwnedFromId(req, res, next) {
	const data = {
		cat_id: req.params.id,
	};

	const results = await catOwnedModel.deleteCatOwnedById(data);

	if (results.affectedRows == 0) {
		res.status(409).json({
			error: `Could not delete the data for id:${data.cat_id}`,
		});
		return;
	}

	res.sendStatus(204);
}

async function checkIfCatOwnedExist(req, res, next) {
	// Checks if the cat owned exist
	const ownedData = await catOwnedModel.selectAllCatOwned();

	const data = {
		cat_id: req.params.id,
	};

	if (ownedData.findIndex((owned) => owned.cat_id == data.cat_id) == -1) {
		// Loops thru all the data and checks whether there is NOT a cat_id
		res
			.status(404)
			.json({ error: `Cannot find cat owned with id ${data.cat_id}` });
	}

	next();
}

module.exports = {
	addCatOwned,
	readCatOwned,
	readCatOwnedDetails,
	readCatOwnedDetailsFromId,
	readCatOwnedDetailsFromOwnerId,
	checkIfCatOwnedExist,
	createCatOwned,
	updateCatOwnedFromId,
	deleteCatOwnedFromId,
	catOwnedCount,
};
