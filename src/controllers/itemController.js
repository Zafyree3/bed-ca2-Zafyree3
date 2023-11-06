const itemModel = require("../models/itemModel");

async function readItems(req, res, next) {
	let results = await itemModel.selectAllItems();
	results.forEach((item) => {
		delete item.ability_id;
	});

	res.status(200).json(results);
}

async function readItemFromId(req, res, next) {
	const data = {
		item_num: req.params.id,
	};

	let results = await itemModel.selectItemById(data);

	if (req.path.includes("details")) {
		res.locals.item = results[0];
		res.locals.next = true;
		next();
		return;
	}
	res.status(200).json(results);
}

async function readItemFull(req, res, next) {
	const data = {
		...res.locals.item,
		...res.locals.ability,
	};

	res.status(200).json(data);
}

module.exports = {
	readItems,
	readItemFromId,
	readItemFull,
};
