const ItemOwnedModel = require("../models/itemOwnedModel");

async function deleteItemOwnedFromItemNum(req, res, next) {
	const data = {
		item_num: req.params.id,
	};

	await ItemOwnedModel.deleteItemOwnedByItemNum(data);

	res.sendStatus(204);
}

async function addItemOwned(req, res, next) {
	const data = {
		item_num: req.body.item_num,
		user_id: req.user.id,
	};

	const results = await ItemOwnedModel.insertNewItemOwned(data);

	res.status(201).send({
		item_owned_id: results.insertId,
		...data,
	});

	next();
}

module.exports = {
	deleteItemOwnedFromItemNum,
	addItemOwned,
};
