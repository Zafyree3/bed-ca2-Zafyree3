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

async function createItemFromId(req, res, next) {
	const data = {
		item_num: req.body.item_num,
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		ability_id: req.body.ability_id,
	};

	let results = await itemModel.insertNewItem(data);

	res.status(201).json(results);
}

async function updateItemFromId(req, res, next) {
	if (
		req.body.name == undefined &&
		req.body.price == undefined &&
		req.body.description == undefined &&
		req.body.ability_id == undefined
	) {
		res.status(400).json({
			error:
				"Please ensure the request body contains an name, price, description, or ability_id",
		});
		return;
	}

	let itemData = await itemModel.selectItemById({ item_num: req.params.id });

	itemData = itemData[0];

	if (req.body.name != undefined) {
		itemData.name = req.body.name;
	}
	if (req.body.price != undefined) {
		itemData.price = req.body.price;
	}
	if (req.body.description != undefined) {
		itemData.description = req.body.description;
	}
	if (req.body.ability_id != undefined) {
		itemData.ability_id = req.body.ability_id;
	}

	const results = await itemModel.updateItemById(itemData);

	res.status(200).json(itemData);
}

async function deleteItemFromId(req, res, next) {
	await itemModel.deleteItemById({ item_num: req.params.id });

	next();
}

async function checkIfItemExist(req, res, next) {
	const itemData = await itemModel.selectAllItems();

	const data = {
		item_num: req.params.id,
	};

	if (itemData.findIndex((item) => item.item_num == data.id) == -1) {
		res.status(404).json({ error: `Cannot find item with id ${data.id}` });
		return;
	}

	next();
}

module.exports = {
	readItems,
	readItemFromId,
	readItemFull,
	createItemFromId,
	checkIfItemExist,
	updateItemFromId,
	deleteItemFromId,
};
