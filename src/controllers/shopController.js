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

async function buyItem(req, res, next) {
	const data = {
		item_num: req.body.item_num,
		user_id: req.user.id,
	};

	res.locals.data = {
		...data,
	};

	res.locals.next = true;

	next();
}

async function findItemPrice(req, res, next) {
	let data = {
		item_num: req.body.item_num,
	};

	if (res.locals.next) {
		data = {
			item_num: req.body.item_num,
		};
	}

	const item = await itemModel.selectItemById(data);

	res.locals.data.price = item[0].price;

	next();
}

module.exports = {
	readShop,
	buyItem,
	findItemPrice,
};
