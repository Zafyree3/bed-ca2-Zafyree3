const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const progressController = require("../controllers/progressController");
const pointsController = require("../controllers/pointsController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get("/", userController.readUsers);
router.post(
	"/",
	userController.checkIfEmailIsUsed,
	userController.checkIfUsernameIsUsed,
	userController.createUser
);

router.get(
	"/profile",
	jwtMiddleware.verifyToken,
	userController.readUserProfile,
	userController.readUserPoints,
	userController.sendUserProfile
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
router.put(
	"/:id/points",
	userController.checkIfUserExist,
	pointsController.checkIfUserIdExist,
	pointsController.updatePointsByUserId
);

router.put(
	"/points/add",
	jwtMiddleware.verifyToken,
	userController.checkIfUserExist,
	pointsController.checkIfUserIdExist,
	pointsController.addPointsByUserId
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
