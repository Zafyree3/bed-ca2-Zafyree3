const express = require("express");
const router = express.Router();

const gachaController = require("../controllers/gachaController.js");

router.get("/", gachaController.readGachas);
router.get(
	"/:id",
	gachaController.checkIfGachaExist,
	gachaController.readGachaFromId
);

module.exports = router;
