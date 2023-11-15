const express = require("express");
const router = express.Router();

const catController = require("../controllers/catController");
const dropController = require("../controllers/dropController");

router.get("/", catController.readCats);
router.get(
	"/update/:id",
	catController.checkIfCatExist,
	dropController.getGachaIdFromCatNum,
	dropController.updateChanceForDrops
);
router.get("/:id", catController.checkIfCatExist, catController.readCatFromId);
router.post("/", catController.createNewCat);
router.put(
	"/:id",
	catController.checkIfCatExist,
	catController.updateCatFromId
);
router.delete(
	"/:id",
	catController.checkIfCatExist,
	catController.deleteCatFromId,
	dropController.getGachaIdFromCatNum,
	dropController.deleteDropFromCatNum,
	dropController.updateChanceForDrops
);

module.exports = router;
