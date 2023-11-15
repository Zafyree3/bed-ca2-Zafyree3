const express = require("express");
const router = express.Router();

const abilityController = require("../controllers/abilityController");

router.get("/", abilityController.readAllAbilities);
router.get(
	"/:id",
	abilityController.checkIfAbilityExist,
	abilityController.readAbilityFromId
);

router.post("/", abilityController.createAbility);

router.put(
	"/:id",
	abilityController.checkIfAbilityExist,
	abilityController.updateAbilityFromId
);

router.delete(
	"/:id",
	abilityController.checkIfAbilityExist,
	abilityController.deleteAbilityFromId
);

module.exports = router;
