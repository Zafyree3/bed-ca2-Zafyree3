const loadData = require("../functions/loadData.js");
const displayData = require("../functions/displayData.js");

async function insertAllData(
	dataList,
	type,
	debug,
	insertDataFunc,
	selectAllFunc
) {
	for (let i = 0; i < dataList.length; i++) {
		await loadData(dataList[i], type, insertDataFunc);
	}
	await displayData(debug, selectAllFunc);
}

module.exports = insertAllData;
