const model = require("../models/messagesModel.js");
const pool = require("../services/db.js");

async function createMessage(req, res, next) {
	if (req.body.message_text == undefined || req.body.message_text == "") {
		res.status(400).send("Error: message_text is undefined");
		return;
	}

	const data = {
		user_id: req.body.user_id || res.locals.userId,
		message_text: req.body.message_text,
	};

	const results = await model.insertSingle(data);

	res.status(201).json({
		id: results.insertId,
		...data,
	});
}

// module.exports.readMessageById = (req, res, next) => {
async function readMessageById(req, res, next) {
	const data = {
		id: req.params.id,
	};

	const results = await model.selectById(data);

	res.status(200).json(results[0]);
}

async function readAllMessage(req, res, next) {
	const results = await model.selectAll({ user_id: res.locals.userId });

	res.status(200).json(results);
}

//module.exports.updateMessageById = (req, res, next) => {
async function updateMessageById(req, res, next) {
	if (req.params.id == undefined) {
		res.status(400).send("Error: id is undefined");
		return;
	} else if (
		req.body.message_text == undefined ||
		req.body.message_text == ""
	) {
		res.status(400).send("Error: message_text is undefined or empty");
		return;
	} else if (req.body.user_id == undefined) {
		res.status(400).send("Error: userId is undefined");
		return;
	}

	const data = {
		id: req.params.id,
		user_id: req.body.user_id,
		message_text: req.body.message_text,
	};

	const results = await model.updateById(data);

	res.status(200).json(results);
}

async function deleteMessageById(req, res, next) {
	const data = {
		id: req.params.id,
	};

	const results = await model.deleteById(data);

	res.status(200).json(results);
}

module.exports = {
	createMessage,
	readMessageById,
	readAllMessage,
	updateMessageById,
	deleteMessageById,
};
