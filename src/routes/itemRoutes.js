const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController.js");
const abilityController = require("../controllers/abilityController.js");

router.get("/", itemController.readItems);
router.get("/:id", itemController.readItemFromId);
router.get(
	"/:id/details",
	itemController.readItemFromId,
	abilityController.readAbilityFromId,
	itemController.readItemFull
);
router.post("/", itemController.createItem);

module.exports = router;
