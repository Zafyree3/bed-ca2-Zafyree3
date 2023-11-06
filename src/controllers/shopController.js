const itemModel = require("../models/itemModel");
const gachaModel = require("../models/gachaModel");

async function readShop(req, res, next) {
	let results = await itemModel.selectAllItems();
	results.forEach((item) => {
		delete item.ability_id;
	});

	let gachaResults = await gachaModel.selectAllGachas();

	res.status(200).json([...results, ...gachaResults]);
}

module.exports = {
	readShop,
};
