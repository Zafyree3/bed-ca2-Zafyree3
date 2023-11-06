const gachaModel = require("../models/gachaModel");

async function readGachas(req, res, next) {
	let results = await gachaModel.selectAllGachas();

	res.status(200).json(results);
}

module.exports = {
	readGachas,
};
