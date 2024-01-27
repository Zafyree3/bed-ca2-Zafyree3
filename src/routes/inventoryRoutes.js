const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get("/", inventoryController.selectItemOwned);
router.get(
	"/owner",
	jwtMiddleware.verifyToken,
	inventoryController.selectItemsOwnedByUserId
);
router.delete("/:id", inventoryController.deleteItemOwnedFromId);

module.exports = router;
