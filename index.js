const app = require("./src/server/app");

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server is live on port ${PORT}`);
});
