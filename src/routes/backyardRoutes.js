const express = require("express");
const router = express.Router();

const backyardController = require("../controllers/backyardController");
const backyardCatController = require("../controllers/backyardCatController");

router.get("/", backyardController.readBackyards);
router.post("/", backyardController.createBackyard);

router.get("/:id", backyardController.readBackyardFromId);
router.put("/:id", backyardController.updateBackyardFromId);
router.delete("/:id", backyardController.deleteBackyardFromId);

router.get("/user/:id", backyardController.readBackyardFromUserId);
router.delete("/user/:id", backyardController.deleteBackyardFromUserId);

router.get("/cats", backyardCatController.readBackyardCatRel);
router.get("/cats/:id", backyardCatController.readBackyardCatRelFromId);

router.get("/:id/cats", backyardCatController.readBackyardCatRelFromBackyardId);
router.post("/:id/cats", backyardCatController.createBackyardCatRel);

module.exports = router;
