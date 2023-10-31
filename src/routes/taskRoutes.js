const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/", taskController.readTasks);
router.post("/", taskController.createTask);

module.exports = router;
