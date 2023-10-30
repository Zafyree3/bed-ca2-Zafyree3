const userModel = require("../models/userModel");

module.exports.getUsers = (req, res, next) => {
	results = userModel.selectAllUsers((error, results, fields) => {
		if (error) throw error;
		console.log("i", results);
		return results;
	});

	console.log(results);

	res.status(200).send(results);
};

module.exports.postUser = (req, res, next) => {
	res.status(201).json(results);
};
