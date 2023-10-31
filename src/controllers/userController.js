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

	const usersData = await userModel.selectAllUsers(); // Gets all the userData

	const data = {
		email: req.body.email,
		username: req.body.username,
	};

	usersDataEmail = usersData.map((data) => {
		// get all the user emails
		return data.email;
	});

	if (usersDataEmail.findIndex((email) => email == data.email) != -1) {
		// Checks whether the email has been used
		res.status(409).json({ error: "Email has already been added" });
		return;
	}

	const results = await userModel.insertNewUser(data);

	res.status(201).json({
		user_id: results.insertId,
		...data,
	});
}

async function readUserFromId(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	const results = await userModel.selectUserById(data);

	res.status(200).json(results[0]);
}

async function updateUserFromId(req, res, next) {
	if (req.body.username == undefined && req.body.email == undefined) {
		res.status(400).json({
			error: "Please ensure the request body contains an username or email",
		});
	}

	const data = {
		user_id: req.params.id,
		username: req.body.username,
		email: req.body.email,
	};

	const usersData = await userModel.selectAllUsers();

	if (usersData.findIndex((user) => user.user_id == data.user_id) == -1) {
		// Check whether the user exist
		res.status(404).json({ error: `Cannot find user with id ${data.user_id}` });
		return;
	}

	if (usersData.findIndex((user) => user.email == data.email) != -1) {
		// Checks whether the email has been used
		res.status(409).json({ error: "Email is already being used" });
		return;
	}
	if (usersData.findIndex((user) => user.username == data.username) != -1) {
		// Checks whether the username has been used
		res.status(409).json({ error: "Username is already being used" });
		return;
	}

	const results = await userModel.updateUserById(data);

	res.status(200).json(data);
}

async function deleteUserFromId(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	const data = {
		user_id: req.params.id,
	};

	if (usersData.findIndex((user) => user.user_id == data.user_id) == -1) {
		res.status(404).json({ error: `Cannot find user with id ${data.user_id}` });
		return;
	}

	await userModel.deleteUserById(data);

	next();
}

module.exports = {
	readUsers,
	createUser,
	readUserFromId,
	updateUserFromId,
	deleteUserFromId,
};
