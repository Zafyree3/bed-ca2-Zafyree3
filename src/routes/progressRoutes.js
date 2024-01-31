const express = require("express");
const router = express.Router();

const progressController = require("../controllers/progressController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.post("/", jwtMiddleware.verifyToken, progressController.createProgress);
router.get("/", progressController.readProgress);

router.get("/count", progressController.countProgress);

router.get(
	"/user",
	jwtMiddleware.verifyToken,
	progressController.readProgressFromUserId
);

router.get(
	"/:id",
	progressController.checkIfProgressExist,
	progressController.readProgressFromId
);

router.put(
	"/:id",
	progressController.checkIfProgressExist,
	progressController.updateProgressFromId
);
router.delete(
	"/:id",
	progressController.checkIfProgressExist,
	progressController.deleteProgressFromId
);

module.exports = router;
