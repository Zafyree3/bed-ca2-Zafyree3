const gachaModel = require("../models/gachaModel");

async function readGachas(req, res, next) {
	let results = await gachaModel.selectAllGachas();

	res.status(200).json(results);
}

async function readGachaFromId(req, res, next) {
	const data = {
		box_id: req.params.id,
	};

	const results = await gachaModel.selectGachaById(data);

	res.status(200).json(results);
}

async function checkIfGachaBoxExist(req, res, next) {
	const boxData = await gachaModel.selectAllGachas();

	const data = {
		box_id: req.body.box_id,
	};

	if (boxData.findIndex((box) => box.box_id == data.box_id) == -1) {
		res.status(404).json({
			error: "Gacha box not found",
		});
		return;
	}

	next();
}

module.exports = {
	readGachas,
	readGachaFromId,
	checkIfGachaBoxExist,
};
