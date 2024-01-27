const transactionModel = require("../models/transactionModel.js");

async function readTransactions(req, res, next) {
	// Read all transactions
	let results = await transactionModel.selectAll();

	res.status(200).json(results);
}

async function readTransactionsByUserId(req, res, next) {
	// Read all transactions from user ID
	const data = {
		user_id: req.params.id || res.locals.userId,
	};

	const results = await transactionModel.selectAllByUserId(data);

	res.status(200).json(results);
}

async function createTransaction(req, res, next) {
	// Create transaction
	const data = {
		user_id: req.body.user_id || res.locals.userId,
		points: req.body.points || res.locals.points,
		points_change: req.body.points_change,
	};

	const results = await transactionModel.insertSingle(data);

	res.status(200).json(results);
}

module.exports = {
	readTransactions,
	readTransactionsByUserId,
	createTransaction,
};
