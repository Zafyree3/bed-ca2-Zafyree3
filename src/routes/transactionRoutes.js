const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController.js");
const pointsController = require("../controllers/pointsController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

router.get("/", transactionController.readTransactions);
router.get(
	"/user",
	jwtMiddleware.verifyToken,
	transactionController.readTransactionsByUserId
);
router.post(
	"/",
	jwtMiddleware.verifyToken,
	pointsController.readPointsFromUserIdAndSaveToLocals,
	transactionController.createTransaction
);

module.exports = router;
