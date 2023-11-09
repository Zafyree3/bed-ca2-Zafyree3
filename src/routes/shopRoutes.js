const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController.js");
const userController = require("../controllers/userController.js");
const inventoryController = require("../controllers/inventoryController.js");
const collectionController = require("../controllers/collectionController.js");
const dropController = require("../controllers/dropController.js");

const itemRouter = require("../routes/itemRoutes.js");
const gachaRouter = require("../routes/gachaRoutes.js");

router.get("/", shopController.readShop);
router.post(
	"/buy",
	shopController.buyItem,
	shopController.findItemPrice,
	userController.checkIfUserExist,
	userController.checkIfPointsIsEnuf,
	userController.updateUserPointsFromId,
	inventoryController.addItemOwned
);

router.post(
	"/buy/gachas",
	shopController.buyGacha,
	shopController.findGachaPrice,
	userController.checkIfUserExist,
	userController.checkIfPointsIsEnuf,
	userController.updateUserPointsFromId,
	dropController.readRandomGachaCatFromGachaId,
	collectionController.addCatOwned
);
router.use("/items", itemRouter);
router.use("/gachas", gachaRouter);

module.exports = router;
