const express = require("express");
const router = express.Router();

const progressController = require("../controllers/progressController");

router.post("/", progressController.createProgress);
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
router.put(
	"/:id",
	progressController.checkIfProgressExist,
	progressController.deleteProgressFromId
);

module.exports = router;
