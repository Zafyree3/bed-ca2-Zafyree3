const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const tasksRouter = require("./taskRoutes");
const progressRouter = require("./progressRoutes");
const shopRouter = require("./shopRoutes");
const catRouter = require("./catRoutes");
const catOwnedRouter = require("./catOwnedRoutes");

router.use("/users", userRoutes);
router.use("/tasks", tasksRouter);
router.use("/task_progress", progressRouter);
router.use("/shop", shopRouter);
router.use("/cats", catRouter);
router.use("/owned", catOwnedRouter);

router.use("/", (req, res, next) => {
	res.status(200).send("The server is live!");
});

module.exports = router;
