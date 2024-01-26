const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
	res.locals.next = false;
	res.locals.verification = true;
	next();
});

app.use("/", express.static("public"));

const mainRoutes = require("./routes/mainRoutes");
app.use("/api", mainRoutes);

module.exports = app;
