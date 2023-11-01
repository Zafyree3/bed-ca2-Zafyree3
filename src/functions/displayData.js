async function displayData(debug, func) {
	if (!debug) return;
	const results = await func();
	console.log(results);
}

module.exports = displayData;
