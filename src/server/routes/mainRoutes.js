const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
	res.status(200).send("The server is live!");
});

module.exports = router;
