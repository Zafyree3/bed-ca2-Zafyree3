const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController.js");
const abilityController = require("../controllers/abilityController.js");
const inventoryController = require("../controllers/inventoryController.js");

router.get("/", itemController.readItems);
router.get(
	"/:id",
	itemController.checkIfItemExist,
	itemController.readItemFromId
);
router.get(
	"/:id/details",
	itemController.checkIfItemExist,
	itemController.readItemFromId,
	abilityController.readAbilityFromId,
	itemController.readItemFull
);
router.post("/", itemController.createItemFromId);

router.put(
	"/:id",
	itemController.checkIfItemExist,
	itemController.updateItemFromId
);

router.delete(
	"/:id",
	itemController.checkIfItemExist,
	itemController.deleteItemFromId,
	inventoryController.deleteItemOwnedFromItemNum
);

module.exports = router;
