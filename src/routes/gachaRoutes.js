const express = require("express");
const router = express.Router();

const gachaController = require("../controllers/gachaController.js");
const dropController = require("../controllers/dropController.js");

router.get("/", gachaController.readGachas);
router.get(
	"/:id",
	gachaController.checkIfGachaBoxExist,
	gachaController.readGachaFromId
);
router.get(
	"/:id/details",
	gachaController.checkIfGachaBoxExist,
	gachaController.readGachaFull
);

router.post("/", gachaController.createGachaBoxFromId);

router.put(
	"/:id",
	gachaController.checkIfGachaBoxExist,
	gachaController.updateGachaBoxFromId
);

router.delete(
	"/:id",
	gachaController.checkIfGachaBoxExist,
	gachaController.deleteGachaBoxFromId,
	dropController.deleteGachaCatFromGachaId
);

module.exports = router;
