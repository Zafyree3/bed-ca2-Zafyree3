const express = require("express");
const router = express.Router();

const dropController = require("../controllers/dropController");

router.get("/", dropController.readAllDrops);
router.get("/details", dropController.readAllDropsDetail);

router.post("/", dropController.createGachaCatForGachaBoxFromId);

router.put(
	"/:id",
	dropController.checkIfDropExist,
	dropController.updateDropFromId
);

router.delete(
	"/:id",
	dropController.checkIfDropExist,
	dropController.deleteDropFromId
);

module.exports = router;
