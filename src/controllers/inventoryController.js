const ItemOwnedModel = require("../models/itemOwnedModel");

async function deleteItemOwnedFromItemNum(req, res, next) {
	const data = {
		item_num: req.params.id,
	};

	await ItemOwnedModel.deleteItemOwnedByItemNum(data);

	res.sendStatus(204);
}

module.exports = {
	deleteItemOwnedFromItemNum,
};
