function formatData(data, type) {
	// converts values in data into their correct type
	switch (type) {
		case "User":
			data.points = +data.points;
			break;
		case "Task":
			data.points = +data.points;
			break;
		case "Cat":
			data.ability_id = +data.ability_id;
			break;
		case "Item":
			data.price = +data.price;
			data.ability_id = +data.price;
			break;
		case "Gacha":
			data.price = +data.price;
			break;
		case "GachaDrop":
			data.cat_num = +data.cat_num;
			data.gacha_id = +data.gacha_id;
			data.chance = +data.chance;
			break;
		default:
			break;
	}

	return data;
}

module.exports = formatData;