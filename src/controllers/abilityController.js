const abilityModel = require("../models/abilityModel");

async function readAbilityFromId(req, res, next) {
	let data = {
		ability_id: req.params.id,
	};

	if (res.locals.next) {
		data = {
			ability_id: res.locals.item.ability_id,
		};
	}

	let results = await abilityModel.selectAbilityById(data);

	if (res.locals.next) {
		res.locals.ability = results[0];
		res.locals.next = true;
		next();
		return;
	}

	res.status(200).json(results);
}

module.exports = {
	readAbilityFromId,
};
