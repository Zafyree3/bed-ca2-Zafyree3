const catModel = require("../models/catModel");

async function readCats(req, res, next) {
	// Read all cats
	let results = await catModel.selectAllCats();
	results.forEach((cat) => {
		// Deletes the ability_id from each cats
		delete cat.ability_id;
	});

	res.status(200).json(results);
}

async function readCatFromId(req, res, next) {
	// Read cat details from id
	const data = {
		cat_num: req.params.id,
	};

	let results = await catModel.selectCatById(data);

	res.status(200).json(results);
}

async function createNewCat(req, res, next) {
	// Create new cats
	if (
		// Checks that there is cat_num, breed, ability
		req.body.cat_num == undefined ||
		req.body.breed == undefined ||
		req.body.ability_id == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains an cat_num, breed and ability_id",
		});
		return;
	}

	const data = {
		cat_num: req.body.cat_num,
		breed: req.body.breed,
		ability_id: req.body.ability_id,
	};

	let results = await catModel.insertNewCat(data);

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
	});
}

async function updateCatFromId(req, res, next) {
	if (
		// Check if there is cat_num, breed or ability_id
		req.body.cat_num == undefined &&
		req.body.breed == undefined &&
		req.body.ability_id == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains an cat_num, breed, ability_id",
		});
		return;
	}

	let catData = await catModel.selectCatWithAbilityIdById({
		cat_num: req.params.id,
	});

	catData = catData[0];

	if (req.body.breed != undefined) {
		catData.breed = req.body.breed;
	}
	if (req.body.ability_id != undefined) {
		console.log("in");
		catData.ability_id = req.body.ability_id;
	}
	if (req.body.cat_num != undefined) {
		catData.cat_num = req.body.cat_num;
	}

	const results = await catModel.updateCatById(catData);

	if (results.affectedRows == 0) {
		res.status(404).json({
			error: `Could not update the data for id: ${req.params.id}`,
		});
		return;
	}

	res.status(200).json(catData);
}

async function deleteCatFromId(req, res, next) {
	await catModel.deleteCatById({ cat_num: req.params.id });

	res.locals.cat_num = req.params.id;

	next();
}

async function checkIfCatExist(req, res, next) {
	// Just checks if the id points to a cat_num
	const catData = await catModel.selectAllCats();

	const data = {
		cat_num: req.params.id,
	};
	if (catData.findIndex((cat) => cat.cat_num == data.cat_num) == -1) {
		// Loops thru all the data and checks whether there is NOT a cat_num
		res.status(404).json({ error: `Cannot find cat with id ${data.cat_num}` });
	}

	next();
}

module.exports = {
	readCats,
	readCatFromId,
	checkIfCatExist,
	createNewCat,
	updateCatFromId,
	deleteCatFromId,
};
