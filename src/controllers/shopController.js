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
		user_id: req.body.id || res.locals.userId,
	};

	res.locals.data = {
		...data,
	};

	res.locals.next = true;

	next();
}

async function buyGacha(req, res, next) {
	const data = {
		box_id: req.body.box_id,
		user_id: req.body.id || res.locals.userId,
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

async function findGachaPrice(req, res, next) {
	let data = {
		box_id: req.body.box_id,
	};

	if (res.locals.next) {
		data = {
			box_id: res.locals.data.box_id,
		};
	}

	console.log(res.locals.data);

	console.log(data);

	const item = await gachaModel.selectGachaById(data);

	console.log(item);

	res.locals.data.price = item[0].price;

	next();
}

module.exports = {
	readShop,
	buyItem,
	findItemPrice,
	findGachaPrice,
	buyGacha,
};
