const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const progressController = require("../controllers/progressController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get("/", taskController.readTasks);
router.post("/", taskController.createTask);
router.get(
	"/user",
	jwtMiddleware.handleNoToken,
	jwtMiddleware.verifyToken,
	taskController.readTasksFromUserId
);
router.get(
	"/:id",
	taskController.checkIfTaskExist,
	taskController.readTasksFromId
);
router.put(
	"/:id",
	taskController.checkIfTaskExist,
	taskController.updateTaskFromId
);
router.delete(
	"/:id",
	taskController.checkIfTaskExist,
	taskController.deleteTaskFromId,
	progressController.deleteProgressFromTaskId
);

module.exports = router;
