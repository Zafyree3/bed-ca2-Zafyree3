const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const progressController = require("../controllers/progressController");

router.get("/", userController.readUsers);
router.post(
	"/",
	userController.checkIfEmailIsUsed,
	userController.checkIfUsernameIsUsed,
	userController.createUser
);
router.get(
	"/:id",
	userController.checkIfUserExist,
	userController.readUserFromId
);
router.put(
	"/:id",
	userController.checkIfUserExist,
	userController.checkIfEmailIsUsed,
	userController.checkIfUsernameIsUsed,
	userController.updateUserFromId
);
router.delete(
	"/:id",
	userController.checkIfUserExist,
	userController.deleteUserFromId,
	progressController.deleteProgressFromUserId
);
router.get(
	"/:id/progress",
	userController.checkIfUserExist,
	progressController.readProgressFromUserId
);

module.exports = router;
