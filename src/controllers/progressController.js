const progressModel = require("../models/progressModel");

async function deleteProgressFromUserId(req, res, next) {
	const data = {
		user_id: req.params.id,
	};

	await progressModel.deleteTaskProgressByUserId(data);

	res.sendStatus(204);
}
async function deleteProgressFromTaskId(req, res, next) {
	const data = {
		task_id: req.params.id,
	};

	await progressModel.deleteTaskProgressByUserId(data);

	res.sendStatus(204);
}

module.exports = {
	deleteProgressFromUserId,
	deleteProgressFromTaskId,
};
