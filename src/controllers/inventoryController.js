const ItemOwnedModel = require("../models/itemOwnedModel");

async function deleteItemOwnedFromItemNum(req, res, next) {
	const data = {
		item_num: req.params.id,
	};

	await ItemOwnedModel.deleteItemOwnedByItemNum(data);

	res.sendStatus(204);
}

async function selectItemsOwnedByUserId(req, res, next) {
	const data = {
		owner_id: req.params.id || res.locals.userId,
	};

	const results = await ItemOwnedModel.selectItemOwnedByUserId(data);

	res.status(200).send(results);
}

async function deleteItemOwnedFromId(req, res, next) {
	const data = {
		item_id: req.params.id,
	};

	await ItemOwnedModel.deleteItemOwnedById(data);

	res.sendStatus(204);
}

async function addItemOwned(req, res, next) {
	const data = {
		item_num: req.body.item_num,
		user_id: req.body.id || res.locals.userId,
		quantity: req.body.quantity || 1,
	};

	const results = await ItemOwnedModel.insertNewItemOwned(data);

	res.status(201).send({
		item_owned_id: results.insertId,
		...data,
	});

	next();
}

async function selectItemOwned(req, res, next) {
	const results = await ItemOwnedModel.selectAllItemOwned();

	res.status(200).send(results);
}

module.exports = {
	deleteItemOwnedFromItemNum,
	addItemOwned,
	selectItemsOwnedByUserId,
	selectItemOwned,
	deleteItemOwnedFromId,
};
