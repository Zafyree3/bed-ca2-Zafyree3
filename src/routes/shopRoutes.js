const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController.js");
const userController = require("../controllers/userController.js");
const inventoryController = require("../controllers/inventoryController.js");
const catOwnedController = require("../controllers/catOwnedController.js");
const dropController = require("../controllers/dropController.js");
const pointsController = require("../controllers/pointsController.js");
const transactionController = require("../controllers/transactionController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

const itemRouter = require("../routes/itemRoutes.js");
const gachaRouter = require("../routes/gachaRoutes.js");

router.get("/", shopController.readShop);
router.post(
	"/buy",
	jwtMiddleware.verifyToken,
	shopController.buyItem,
	shopController.findItemPrice,
	userController.checkIfUserExist,
	pointsController.checkIfPointsIsEnuf,
	pointsController.updatePointsByUserId,
	transactionController.createTransaction,
	inventoryController.addItemOwned
);

router.post(
	"/buy/gachas",
	jwtMiddleware.verifyToken,
	shopController.buyGacha,
	shopController.findGachaPrice,
	userController.checkIfUserExist,
	pointsController.checkIfPointsIsEnuf,
	pointsController.updatePointsByUserId,
	transactionController.createTransaction,
	dropController.readRandomGachaCatFromGachaId,
	catOwnedController.addCatOwned
);
router.use("/items", itemRouter);
router.use("/gachas", gachaRouter);

module.exports = router;
