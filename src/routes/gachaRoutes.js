const express = require("express");
const router = express.Router();

const gachaController = require("../controllers/gachaController.js");

router.get("/", gachaController.readGachas);

module.exports = router;
