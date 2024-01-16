const abilityModel = require("../models/abilityModel");

async function readAllAbilities(req, res, next) {
	// Gets all the of the abilities
	const results = await abilityModel.selectAllAbilities();

	res.status(200).json(results);
}

async function readAbilityFromId(req, res, next) {
	let data = {
		ability_id: req.params.id,
	};

	if (res.locals.next) {
		data = {
			ability_id: res.locals.item.ability_id,
		};
	}

	let results = await abilityModel.selectAbilityById(data);

	if (res.locals.next) {
		res.locals.ability = results[0];
		res.locals.next = true;
		next();
		return;
	}

	res.status(200).json(results[0]);
}

async function createAbility(req, res, next) {
	// create the ability
	if (
		req.body.ability_id == undefined ||
		req.body.action == undefined ||
		req.body.description == undefined
	) {
		res.status(400).json({
			error:
				"Please include the ability_id, action and description in the request body",
		});
	}

	const data = {
		ability_id: req.body.ability_id,
		action: req.body.action,
		description: req.body.description,
	};

	const results = await abilityModel.insertNewAbility(data); // insert data

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

	res.status(201).json({ ...data });
}

async function updateAbilityFromId(req, res, next) {
	if (
		req.body.ability_id == undefined &&
		req.body.action == undefined &&
		req.body.description == undefined
	) {
		res.status(400).json({
			error:
				"Please include the ability_id, action or description in the request body",
		});
	}

	let abilityData = await abilityModel.selectAbilityById({
		ability_id: req.params.id,
	});

	abilityData = abilityData[0];

	if (req.body.action != undefined) {
		abilityData.action = req.body.action;
	}

	if (req.body.description != undefined) {
		abilityData.description = req.body.description;
	}

	const results = await abilityModel.updateAbilityById(abilityData);

	if (results.affectedRows == 0) {
		// Checks whether the rows is affects
		res.status(409).json({
			error: `Could not update the data for id: ${req.params.id}`,
		});
		return;
	}

	res.status(200).json(abilityData);
}

async function deleteAbilityFromId(req, res, next) {
	// Delete based on ability id
	const data = {
		ability_id: req.params.id,
	};

	const results = await abilityModel.deleteAbilityById(data);

	if (results[0].affectedRows == 0) {
		res.status(409).json({
			error: `Could not delete the data for id:${data.ability_id}`,
		});
		return;
	}

	res.sendStatus(204);
}

async function checkIfAbilityExist(req, res, next) {
	// Check if the ability exist
	const abilityData = await abilityModel.selectAllAbilities();

	const data = {
		ability_id: req.params.id,
	};

	if (
		abilityData.findIndex((ability) => ability.ability_id == data.ability_id) ==
		-1
	) {
		res
			.status(404)
			.json({ error: `Cannot find ability with id: ${data.ability_id}` });
		return;
	}

	next();
}

module.exports = {
	readAbilityFromId,
	readAllAbilities,
	checkIfAbilityExist,
	createAbility,
	updateAbilityFromId,
	deleteAbilityFromId,
};
