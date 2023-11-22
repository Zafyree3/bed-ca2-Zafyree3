const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController.js");
const userController = require("../controllers/userController.js");
const inventoryController = require("../controllers/inventoryController.js");
const catOwnedController = require("../controllers/catOwnedController.js");
const dropController = require("../controllers/dropController.js");
const pointsController = require("../controllers/pointsController.js");

const itemRouter = require("../routes/itemRoutes.js");
const gachaRouter = require("../routes/gachaRoutes.js");

router.get("/", shopController.readShop);
router.post(
	"/buy",
	shopController.buyItem,
	shopController.findItemPrice,
	userController.checkIfUserExist,
	pointsController.checkIfPointsIsEnuf,
	pointsController.updatePointsByUserId,
	inventoryController.addItemOwned
);

router.post(
	"/buy/gachas",
	shopController.buyGacha,
	shopController.findGachaPrice,
	userController.checkIfUserExist,
	pointsController.checkIfPointsIsEnuf,
	pointsController.updatePointsByUserId,
	dropController.readRandomGachaCatFromGachaId,
	catOwnedController.addCatOwned
);
router.use("/items", itemRouter);
router.use("/gachas", gachaRouter);

module.exports = router;
