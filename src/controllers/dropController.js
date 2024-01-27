const dropModel = require("../models/dropModel");

async function readAllDrops(req, res, next) {
	// read all the drops
	const results = await dropModel.selectAllGachaCat();

	res.status(200).json(results);
}

async function readAllDropsDetail(req, res, next) {
	// read all the drops with details like cat, ability and box
	const results = await dropModel.selectAllGachaCatDetail();

	res.status(200).json(results);
}

async function updateDropFromId(req, res, next) {
	// update the drops
	if (
		req.body.cat_num == undefined &&
		req.body.gacha_id == undefined &&
		req.body.chance == undefined
	) {
		res.status(400).json({
			error: "Please include cat_num, gacha_id, or chance",
		});
		return;
	}

	let dropData = await dropModel.selectGachaCatById({
		drop_id: req.params.id,
	});

	dropData = dropData[0];

	if (req.body.cat_num != undefined) {
		dropData.cat_num = req.body.cat_num;
	}

	if (req.body.gacha_id != undefined) {
		dropData.gacha_id = req.body.gacha_id;
	}

	if (req.body.chance != undefined) {
		dropData.chance = req.body.chance;
	}

	const results = await dropModel.updateGachaCatById(dropData);

	if (results.affectedRows == 0) {
		// Checks whether the rows is affects
		res.status(409).json({
			error: `Could not update the data for id: ${req.params.id}`,
		});
		return;
	}

	res.status(200).json(dropData);
}

async function deleteDropFromId(req, res, next) {
	// Delete based on the drop id

	const data = {
		drop_id: req.params.id,
	};

	const results = await dropModel.deleteGachaCatById(data);

	if (results[0].affectedRows == 0) {
		res.status(409).json({
			error: `Could not delete the data for id:${data.cat_id}`,
		});
		return;
	}

	res.sendStatus(204);
}

async function createGachaCatForGachaBoxFromId(req, res, next) {
	// create a new drop that require cat, box and chance
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

	const results = await dropModel.insertNewGachaCat(data);

	res.status(201).json({ ...data });
}

async function deleteGachaCatFromGachaId(req, res, next) {
	const data = {
		gacha_id: req.params.id,
	};

	const results = await dropModel.deleteGachaCatByGachaId(data);

	res.status(201).json(results);
}

async function readRandomGachaCatFromGachaId(req, res, next) {
	let data = {
		gacha_id: req.params.id,
	};

	if (res.locals.next) {
		data = {
			gacha_id: res.locals.data.box_id,
		};
	}

	const results = await dropModel.selectRandomGachaCatByGachaId(data);

	console.log(results);
	console.log(results[2][0].cat_num);

	res.locals.data.cat_num = results[2][0].cat_num;

	next();
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

async function checkIfDropExist(req, res, next) {
	const data = {
		drop_id: req.params.id,
	};

	const dropData = await dropModel.selectAllGachaCat();

	if (dropData.findIndex((drop) => drop.drop_id == data.drop_id) == -1) {
		res.send(404).json({
			error: `Cannot find drop with id: ${data.drop_id}`,
		});
	}

	next();
}

module.exports = {
	createGachaCatForGachaBoxFromId,
	deleteGachaCatFromGachaId,
	readRandomGachaCatFromGachaId,
	deleteDropFromCatNum,
	getGachaIdFromCatNum,
	updateChanceForDrops,
	readAllDrops,
	readAllDropsDetail,
	checkIfDropExist,
	updateDropFromId,
	deleteDropFromId,
};
