const userModel = require("../models/userModel");

async function readUsers(req, res, next) {
	const results = await userModel.selectAllUsers();

	res.status(200).json(results);
}

async function createUser(req, res, next) {
	// The password here will be unhashed
	if (
		req.body.username == undefined ||
		req.body.email == undefined ||
		req.body.password == undefined
	) {
		// Checks that required data is there
		res.status(400).json({
			error: "Please ensure the request body contains an username and email",
		});
		return;
	}

	const data = {
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
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

	const results = await userModel.selectUserById(data);

	res.status(200).json(results[0]);
}

async function updateUserFromId(req, res, next) {
	if (req.body.username == undefined && req.body.email == undefined) {
		res.status(400).json({
			error: "Please ensure the request body contains an username or email",
		});
		return;
	}

	let userData = await userModel.selectUserById({ user_id: req.params.id });
	userData = userData[0];

	if (req.body.email != undefined) {
		userData.email = req.body.email;
	}

	if (req.body.username != undefined) {
		userData.username = req.body.username;
	}

	const results = await userModel.updateUserById(userData);

	res.status(200).json(userData);
}

async function updateUserPointsFromId(req, res, next) {
	let data = {
		user_id: req.params.id,
		points: req.body.points,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.data.user_id,
			points: res.locals.data.points,
		};

		data.points = data.points - res.locals.data.points;
	}

	const results = await userModel.updateUserPointsById(data);

	if (res.locals.next) {
		next();
		return;
	}

	res.status(200).json({
		user_id: data.user_id,
		points: data.points,
	});
}

async function deleteUserFromId(req, res, next) {
	await userModel.deleteUserById({ user_id: req.params.id });

	next();
}

async function checkIfUserExist(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	let data = {
		user_id: req.params.id,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.data.user_id,
		};
	}

	if (usersData.findIndex((user) => user.user_id == data.user_id) == -1) {
		res.status(404).json({ error: `Cannot find user with id ${data.user_id}` });
		return;
	}

	next();
}

async function checkIfEmailIsUsed(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	if (usersData.findIndex((user) => user.email == req.body.email) != -1) {
		res.status(409).json({ error: "Email is already being used" });
		return;
	}

	next();
}

async function checkIfUsernameIsUsed(req, res, next) {
	const usersData = await userModel.selectAllUsers();

	if (usersData.findIndex((user) => user.username == req.body.username) != -1) {
		res.status(409).json({ error: "Username is already being used" });
		return;
	}

	next();
}

async function checkIfPointsIsEnuf(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	if (res.locals.next) {
		data = {
			user_id: res.locals.data.user_id,
		};
	}

	const userData = await userModel.selectUserById(data);

	if (res.locals.data.points > userData[0].points) {
		res.status(406).json({ error: "Not enough points" });
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
	checkIfPointsIsEnuf,
	updateUserPointsFromId,
};
