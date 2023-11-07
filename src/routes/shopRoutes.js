const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController.js");
const itemRouter = require("../routes/itemRoutes.js");
const gachaRouter = require("../routes/gachaRoutes.js");

router.get("/", shopController.readShop);
router.post("/buy", shopController.buyItem);
router.use("/items", itemRouter);
router.use("/gachas", gachaRouter);

module.exports = router;
