const backyardModel = require("../models/backyardModel");

async function createBackyard(req, res, next) {
	// Create a new backyard

	if (req.body.name == undefined) {
		res.status(400).json({
			error: "Please include the name in the request body",
		});
		return;
	}

	let data = {
		name: req.body.name,
		user_id: req.body.id,
	};

	const results = await backyardModel.insertNewBackyard(data);

	res.status(201).send({
		backyard_id: results.insertId,
		...data,
	});
}

async function readBackyard(req, res, next) {
	// Read all backyards
	let results = await backyardModel.selectAllBackyard();

	res.status(200).json(results);
}

async function readBackyardFromId(req, res, next) {
	// Read backyard from id
	let data = {
		backyard_id: req.params.id,
	};

	let results = await backyardModel.selectBackyardById(data);

	res.status(200).json(results);
}

async function readBackyardFromUserId(req, res, next) {
	// Read backyard from user id
	let data = {
		user_id: req.params.id,
	};

	let results = await backyardModel.selectBackyardByUserId(data);

	res.status(200).json(results);
}

async function updateBackyardFromId(req, res, next) {
	if (req.body.name == undefined && req.body.user_id == undefined) {
		res.status(400).json({
			error: "Please include the name and user_id in the request body",
		});
	}

	let backyardData = await backyardModel.selectBackyardById({
		backyard_id: req.params.id,
	});

	backyardData = backyardData[0];

	if (req.body.name != undefined) {
		backyardData.name = req.body.name;
	}

	if (req.body.user_id != undefined) {
		backyardData.user_id = req.body.user_id;
	}

	const results = await backyardModel.updateBackyardById(backyardData);

	if (results.errno != undefined) {
		res.status(400).json({ error: results.sqlMessage });
		return;
	}

	if (results.affectedRows == 0) {
		res.status(400).json({ error: "Cannot update backyard" });
		return;
	}

	res.status(200).json(backyardData);
}

async function deleteBackyardFromId(req, res, next) {
	// Delete backyard from id
	let data = {
		backyard_id: req.params.id,
	};

	let results = await backyardModel.deleteBackyardById(data);

	if (results.errno != undefined) {
		res.status(400).json({ error: results.sqlMessage });
		return;
	}

	if (results.affectedRows == 0) {
		res.status(400).json({ error: "Cannot delete backyard" });
		return;
	}

	res.sendStatus(204);
}

async function deleteBackyardFromUserId(req, res, next) {
	// Delete backyard from user id
	let data = {
		user_id: req.params.id,
	};

	let results = await backyardModel.deleteBackyardByUserId(data);

	if (results.errno != undefined) {
		res.status(400).json({ error: results.sqlMessage });
		return;
	}

	if (results.affectedRows == 0) {
		res.status(400).json({ error: "Cannot delete backyard" });
		return;
	}

	res.sendStatus(204);
}

module.exports = {
	createBackyard,
	readBackyard,
	readBackyardFromId,
	readBackyardFromUserId,
	updateBackyardFromId,
	deleteBackyardFromId,
	deleteBackyardFromUserId,
};
