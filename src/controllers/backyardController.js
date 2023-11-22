const backyardModel = require("../models/backyardModel");

async function createBackyard(req, res, next) {
	let data = {
		name: req.body.name,
		user_id: req.user.id,
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
