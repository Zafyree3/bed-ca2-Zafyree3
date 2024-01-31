const express = require("express");
const router = express.Router();

const controller = require("../controllers/messagesController.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

router.get(
	"/",
	jwtMiddleware.handleNoToken,
	jwtMiddleware.verifyToken,
	controller.readAllMessage
);
router.post("/", jwtMiddleware.verifyToken, controller.createMessage);
router.get("/:id", controller.readMessageById);
router.put("/:id", jwtMiddleware.verifyToken, controller.updateMessageById);
router.delete("/:id", controller.deleteMessageById);

module.exports = router;
