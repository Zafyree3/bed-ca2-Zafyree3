const express = require("express");
const router = express.Router();

const catOwnedController = require("../controllers/catOwnedController");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get("/", catOwnedController.readCatOwned);
router.get("/details", catOwnedController.readCatOwnedDetails);
router.get(
	"/:id/details",
	catOwnedController.checkIfCatOwnedExist,
	catOwnedController.readCatOwnedDetailsFromId
);

router.get(
	"/owner",
	jwtMiddleware.verifyToken,
	userController.checkIfUserExist,
	catOwnedController.readCatOwnedDetailsFromOwnerId
);

router.get(
	"/owner/:id",
	userController.checkIfUserExist,
	catOwnedController.readCatOwnedDetailsFromOwnerId
);

router.post("/", catOwnedController.createCatOwned);

router.put(
	"/:id",
	catOwnedController.checkIfCatOwnedExist,
	catOwnedController.updateCatOwnedFromId
);

router.delete(
	"/:id",
	catOwnedController.checkIfCatOwnedExist,
	catOwnedController.deleteCatOwnedFromId
);

module.exports = router;
