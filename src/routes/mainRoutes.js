const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tasksRouter = require("./taskRoutes");
const progressRouter = require("./progressRoutes");

router.use("/users", userRoutes);
router.use("/tasks", tasksRouter);
router.use("/task_progress", progressRouter);
router.use("/", (req, res, next) => {
	res.status(200).send("The server is live!");
});

module.exports = router;
