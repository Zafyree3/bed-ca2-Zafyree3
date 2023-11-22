const backyardCatModel = require("../models/backyardCatModel");
const moment = require("moment");

async function createBackyardCatRel(req, res, next) {
	// Create a new backyard cat rel
	if (req.body.backyard_id == undefined || req.body.cat_id == undefined) {
		res.status(400).json({
			error: "Please include the backyard_id and cat_id in the request body",
		});
		return;
	}

	const data = {
		backyard_id: req.body.backyard_id,
		cat_id: req.body.cat_id,
		date_added: moment().format("YYYY-MM-DD HH:mm:ss"),
	};

	const results = await backyardCatModel.insertNewBackyardCatRel(data);

	if (results.errno != undefined) {
		res.status(400).json({ error: results.sqlMessage });
		return;
	}

	if (results.affectedRows == 0) {
		res.status(400).json({ error: "Unable to create backyard cat rel" });
		return;
	}

	res.status(201).json(data);
}

async function readBackyardCatRel(req, res, next) {
	// Read all backyard cat rels
	const results = await backyardCatModel.selectAllBackyardCatRel();

	res.status(200).json(results);
}

async function readBackyardCatRelFromId(req, res, next) {
	// Read backyard cat rel from id
	let data = {
		backyard_cat_id: req.params.id,
	};

	let results = await backyardCatModel.selectBackyardCatRelById(data);

	res.status(200).json(results);
}

async function readBackyardCatRelFromBackyardId(req, res, next) {
	// Read backyard cat rel from backyard id
	let data = {
		backyard_id: req.params.id,
	};

	let results = await backyardCatModel.selectBackyardCatRelByBackyardId(data);

	res.status(200).json(results);
}

async function updateBackyardCatRelFromId(req, res, next) {
	// Update backyard cat rel from id
	if (
		req.body.backyard_id == undefined &&
		req.body.cat_id == undefined &&
		req.body.date_added == undefined
	) {
		res.status(400).json({
			error:
				"Please include the backyard_id, cat_id or date_added in the request body",
		});
		return;
	}

	let backyardCatRelData = await backyardCatModel.selectBackyardCatRelById({
		backyard_cat_id: req.params.id,
	});

	backyardCatRelData = backyardCatRelData[0];

	if (req.body.backyard_id != undefined) {
		backyardCatRelData.backyard_id = req.body.backyard_id;
	}

	if (req.body.cat_id != undefined) {
		backyardCatRelData.cat_id = req.body.cat_id;
	}

	if (req.body.date_added != undefined) {
		backyardCatRelData.date_added = req.body.date_added;
	}

	const DATEFROMATREGEX = /\d{4}\/\d{2}\/\d{2}/; // This regex check for 4 digits, /, 2 digits, / 2 digits
	const formatRegex = new RegExp(DATEFROMATREGEX);

	// Check if date_added is in the correct format
	if (!formatRegex.test(backyardCatRelData.date_added)) {
		res.status(400).json({
			error: "Please ensure the date_added follows a format YYYY/MM/DD",
		});
		return;
	}

	// Checks if values is corrects
	const CAPTUREREGEX = /(\d{4})\/(\d{2})\/(\d{2})/;
	let match = backyardCatRelData.date_added.match(CAPTUREREGEX);
	/// match[1] = year, match[2] = month, match[3] = date
	if (parseInt(match[2]) > 12 || parseInt(match[2]) < 0) {
		// Checks that the months is < 12 and > 0
		res.status(400).json({
			error: "Please ensure the the months is from 01 - 12",
		});
		return;
	}

	let daysInMonth = new Date(
		parseInt(match[1]),
		parseInt(match[2]),
		0
	).getDate();

	if (parseInt(match[3]) < 1 || parseInt(match[3]) > daysInMonth) {
		res.status(400).json({
			error: " Please ensure that the numbers of days is correct",
		});
		return;
	}

	const results = await backyardCatModel.updateBackyardCatRelById(
		backyardCatRelData
	);

	if (results.affectedRows == 0) {
		res.status(409).json({ error: "Cannot update backyard cat rel" });
		return;
	}

	res.status(200).json(backyardCatRelData);
}

async function deleteBackyardCatRelFromId(req, res, next) {
	// Delete backyard cat rel from id
	const data = {
		backyard_cat_id: req.params.id,
	};

	const results = await backyardCatModel.deleteBackyardCatRelById(data);

	if (results.affectedRows == 0) {
		res.status(400).json({ error: "Cannot delete backyard cat rel" });
		return;
	}

	res.sendStatus(204);
}

async function checkIfBackyardCatRelExists(req, res, next) {
	// Check if backyard cat rel exists
	const relData = await backyardCatModel.selectAllBackyardCatRel();

	const data = {
		backyard_id: req.params.id,
	};

	if (relData.findIndex((rel) => rel.backyard_id == data.backyard_id) == -1) {
		res
			.status(404)
			.json({
				error: `Backyard cat rel with id:${data.backyard_id} does not exist`,
			});
		return;
	}

	next();
}

module.exports = {
	createBackyardCatRel,
	readBackyardCatRel,
	readBackyardCatRelFromId,
	readBackyardCatRelFromBackyardId,
	updateBackyardCatRelFromId,
	deleteBackyardCatRelFromId,
	checkIfBackyardCatRelExists,
};
