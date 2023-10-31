const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const progressController = require("../controllers/progressController");

router.get("/", userController.readUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.readUserFromId);
router.put("/:id", userController.updateUserFromId);
router.delete(
	"/:id",
	userController.deleteUserFromId,
	progressController.deleteProgressFromUserId
);

module.exports = router;
