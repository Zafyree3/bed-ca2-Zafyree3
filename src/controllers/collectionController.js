const catOwnedModel = require("../models/catOwnedModel");

async function addCatOwned(req, res, next) {
	let data = {
		cat_num: req.body.cat_num,
		user_id: req.user.id,
	};

	if (res.locals.next) {
		data = {
			cat_num: res.locals.data.cat_num,
			user_id: res.locals.data.user_id,
		};
	}

	const results = await catOwnedModel.insertNewCatOwned(data);

	res.status(201).send({
		cat_owned_id: results.insertId,
		...data,
	});

	next();
}

module.exports = {
	addCatOwned,
};
