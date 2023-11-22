function formatData(data, type) {
	// converts values in data into their correct type
	switch (type) {
		case "Ability":
			data.ability_id = +data.ability_id;
			break;
		case "Task":
			data.points = +data.points;
			break;
		case "Cat":
			data.cat_num = +data.cat_num;
			data.ability_id = +data.ability_id;
			break;
		case "Owned":
			data.cat_num = +data.cat_num;
			data.owner_id = +data.owner_id;
			break;
		case "Item":
			data.price = +data.price;
			data.ability_id = +data.ability_id;
			break;
		case "Gacha":
			data.box_id = +data.box_id;
			data.price = +data.price;
			break;
		case "GachaDrop":
			data.cat_num = +data.cat_num;
			data.gacha_id = +data.gacha_id;
			data.chance = +data.chance;
			break;
		case "Points":
			data.points = +data.points;
			break;
		default:
			break;
	}

	return data;
}

module.exports = formatData;
