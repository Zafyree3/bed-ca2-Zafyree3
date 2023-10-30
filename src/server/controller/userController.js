const userModel = require("../../SQL/models/userModel");

module.exports.getUsers = (req, res, next) => {
	results = userModel.selectAllUsers((err, results) => {
		if (err) throw err;
		return results;
	});

	res.status(200).send(results);
};
