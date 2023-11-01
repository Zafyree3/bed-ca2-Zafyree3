const formatData = require("../functions/formatData.js");

async function loadData(data, type, insertDataFunc) {
	data = formatData(data, type);
	const results = await insertDataFunc(data);
	console.log(`Inserted at id:${results.insertId}`);
}

module.exports = loadData;
