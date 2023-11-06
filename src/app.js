const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.locals.next = false;
	next();
});

const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

module.exports = app;
