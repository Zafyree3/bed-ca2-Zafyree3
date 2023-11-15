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

async function deleteDropFromCatNum(req, res, next) {
	const data = {
		cat_num: res.locals.cat_num,
	};

	const results = await dropModel.deleteGachaCatByCatNum(data);

	next();
}

async function updateChanceForDrops(req, res, next) {
	const gacha_id_list = res.locals.gacha_ids; // gets the list of gacha_id

	for (let i = 0; i < gacha_id_list.length; i++) {
		// loop thru each id
		const data = gacha_id_list[i];

		const results = await dropModel.selectChanceByGachaId(data); // get the chance of each drop in the gacha box

		let sumChance = results.reduce(
			(accumulator, data) => accumulator + data.chance,
			0
		); // get the sum of the chances

		let remainingChance = 100 - sumChance; // find the remaining value

		let updateChance = results; // copy the results

		if (remainingChance == 0) {
			continue;
		}
		for (let j = 0; j < results.length; j++) {
			// loops thru each drop
			updateChance[j].chance += Math.floor(remainingChance); // updates the chance

			let updateResult = await dropModel.updateChanceByDropId(updateChance[j]); // query sql to update

			if (updateResult.affectedRows > 0) continue; // if row is affected, continue

			res
				.json({
					error: `Could not update chance of drop_id ${updateChance[j].drop_id}`,
				})
				.status(409); // send error message when row was not affect
			return;
		}
	}

	res.sendStatus(204);
}

async function getGachaIdFromCatNum(req, res, next) {
	const data = {
		cat_num: req.params.id,
	};

	const results = await dropModel.selectGachaIdByCatNum(data);

	res.locals.gacha_ids = results;

	next();
}

module.exports = {
	createGachaCatForGachaBoxFromId,
	deleteGachaCatFromGachaId,
	readRandomGachaCatFromGachaId,
	deleteDropFromCatNum,
	getGachaIdFromCatNum,
	updateChanceForDrops,
};
