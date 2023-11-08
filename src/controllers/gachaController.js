const gachaModel = require("../models/gachaModel");
const dropModel = require("../models/dropModel");

async function readGachas(req, res, next) {
	let results = await gachaModel.selectAllGachas();

	res.status(200).json(results);
}

async function readGachaFromId(req, res, next) {
	const data = {
		box_id: req.params.id,
	};

	const results = await gachaModel.selectGachaById(data);

	res.status(200).json(results[0]);
}

async function checkIfGachaBoxExist(req, res, next) {
	const boxData = await gachaModel.selectAllGachas();

	const data = {
		box_id: req.params.id,
	};

	if (boxData.findIndex((box) => box.box_id == data.box_id) == -1) {
		res.status(404).json({
			error: "Gacha box not found",
		});
		return;
	}

	next();
}

async function readGachaFull(req, res, next) {
	const data = {
		box_id: req.params.id,
		gacha_id: req.params.id,
	};

	const results = await gachaModel.selectGachaById(data);
	const dropResults = await dropModel.selectGachaCatByGachaId(data);

	res.status(200).json({
		...results[0],
		drops: dropResults,
	});
}

async function createGachaBoxFromId(req, res, next) {
	if (
		req.body.box_id == undefined ||
		req.body.name == undefined ||
		req.body.price == undefined ||
		req.body.description == undefined
	) {
		res.status(400).json({
			error: "Please include box_id, name, price, and description",
		});
		return;
	}

	const data = {
		box_id: req.body.box_id,
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
	};

	const results = await gachaModel.insertNewGacha(data);

	res.status(201).json({
		...data,
	});
}

async function updateGachaBoxFromId(req, res, next) {
	if (
		req.body.name == undefined &&
		req.body.price == undefined &&
		req.body.description == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains an name, price, or description",
		});
		return;
	}

	let boxData = await gachaModel.selectGachaById({ box_id: req.params.id });

	boxData = boxData[0];

	if (req.body.name != undefined) {
		boxData.name = req.body.name;
	}
	if (req.body.price != undefined) {
		boxData.price = req.body.price;
	}
	if (req.body.description != undefined) {
		boxData.description = req.body.description;
	}

	const results = await gachaModel.updateGachaById(boxData);

	res.status(200).json(boxData);
}

async function deleteGachaBoxFromId(req, res, next) {
	const data = {
		box_id: req.params.id,
	};

	const results = await gachaModel.deleteGachaById(data);

	next();
}

module.exports = {
	readGachas,
	readGachaFromId,
	checkIfGachaBoxExist,
	readGachaFull,
	createGachaBoxFromId,
	updateGachaBoxFromId,
	deleteGachaBoxFromId,
};
