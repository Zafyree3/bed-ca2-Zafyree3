const transactionModel = require("../models/transactionModel.js");

async function getSpentPoints(req, res, next) {
	const results = await transactionModel.selectSpentPoints();

	res.status(200).json(results[0]);
}

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
	let data = {
		user_id: req.body.user_id || res.locals.userId,
		points: req.body.points || res.locals.points,
		points_change: req.body.points_change,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.userId,
			points: res.locals.data.userPoints,
			points_change: res.locals.data.price * -1,
		};
	}

	const results = await transactionModel.insertSingle(data);

	if (res.locals.next) {
		next();
		return;
	}

	res.status(200).json(results);
}

module.exports = {
	readTransactions,
	readTransactionsByUserId,
	createTransaction,
	getSpentPoints,
};
