const dropModel = require("../models/dropModel");

async function createGachaCatForGachaBoxFromId(req, res, next) {
	if (
		req.body.cat_num == undefined ||
		req.body.gacha_id == undefined ||
		req.body.chance == undefined
	) {
		res.status(400).json({
			error: "Please include cat_num, gacha_id, and chance",
		});
		return;
	}

	const data = {
		cat_num: req.body.cat_num,
		gacha_id: req.body.gacha_id,
		chance: req.body.chance,
	};

	const result = await dropModel.insertNewGachaCat(data);

	res.json(result);
}

async function deleteGachaCatFromGachaId(req, res, next) {
	const data = {
		gacha_id: req.params.id,
	};

	const results = await dropModel.deleteGachaCatByGachaId(data);

	res.status(200).json(results);
}

async function readRandomGachaCatFromGachaId(req, res, next) {
	const data = {
		gacha_id: req.params.id,
	};

	const results = await dropModel.selectRandomGachaCatByGachaId(data);

	res.locals.data.cat_num = results[0].cat_num;
}

module.exports = {
	createGachaCatForGachaBoxFromId,
	deleteGachaCatFromGachaId,
	readRandomGachaCatFromGachaId,
};
