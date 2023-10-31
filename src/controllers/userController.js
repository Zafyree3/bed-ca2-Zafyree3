const userModel = require("../models/userModel");

async function readUsers(req, res, next) {
	const results = await userModel.selectAllUsers();

	res.status(200).json(results);
}

async function createUser(req, res, next) {
	if (req.body.username == undefined || req.body.username == undefined) {
		// Checks that required data is there
		res.status(400).json({
			error: "Please ensure the request body contains an username and email",
		});
		return;
	}

	const data = {
		email: req.body.email,
		username: req.body.username,
	};

	const results = await userModel.insertNewUser(data);

	res.status(201).json({
		user_id: results.insertId,
		...data,
	});
}

async function readUserFromId(req, res, next) {
	// TODO: make sure user exist
	const data = {
		user_id: req.params.id,
	};

	const results = await userModel.readUserFromId(data);

	res.status(200).json(results[0]);
}

async function updateUserFromId(req, res, next) {
	if (req.body.username == undefined && req.body.email == undefined) {
		res.status(400).json({
			error: "Please ensure the request body contains an username or email",
		});
		return;
	}

	const userData = await userModel.selectUserById({ user_id: req.params.id });

	const data = {
		user_id: req.params.id,
		username:
			req.body.username != undefined ? req.body.username : userData.username,
		email: req.body.email != undefined ? req.body.email : userData.email,
	};

	const results = await userModel.updateUserById(data);

	res.status(200).json(data);
}

async function deleteUserFromId(req, res, next) {
	await userModel.deleteUserById(data);

	next();
}

async function checkIfUserExist(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	const data = {
		user_id: req.params.id,
	};

	if (usersData.findIndex((user) => user.user_id == data.user_id) == -1) {
		res.status(404).json({ error: `Cannot find user with id ${data.user_id}` });
		return;
	}

	next();
}

async function checkIfEmailIsUsed(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	if (usersData.findIndex((user) => user.email == req.body.email) == -1) {
		res.status(409).json({ error: "Email is already being used" });
		return;
	}

	next();
}

async function checkIfUsernameIsUsed(req, res, next) {
	const usersData = await userModel.selectAllTasks();

	if (usersData.findIndex((user) => user.username == req.body.username) == -1) {
		res.status(409).json({ error: "Username is already being used" });
		return;
	}

	next();
}

module.exports = {
	readUsers,
	createUser,
	readUserFromId,
	updateUserFromId,
	deleteUserFromId,
	checkIfUserExist,
	checkIfEmailIsUsed,
	checkIfUsernameIsUsed,
};
