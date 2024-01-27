document.addEventListener("DOMContentLoaded", function () {
	loadCats();
});

function loadCats() {
	const catRow = document.getElementById("cats-row");

	const cat_types = ["calico", "gray-tabby", "orange-tabby"];

	const cat_positions = ["sit", "walk", "sleep"];

	const callback = (status, data) => {
		console.log(data);

		catRow.innerHTML = "";
		data.forEach((cat) => {
			const catCol = document.createElement("div");
			catCol.className = "col-md-3";

			catCol.dataset.id = cat.cat_id;
			catCol.dataset.owner = cat.owner_id;

			const catCard = document.createElement("div");
			catCard.className = "card w-100 h-100";

			const catImage = document.createElement("img");
			catImage.className = "card-img-top";
			catImage.src = `https://zayzaf-3.sirv.com/images/${
				cat_types[rng(0, 2)]
			}/${cat_positions[rng(0, 2)]}.png`;

			const catCardBody = document.createElement("div");
			catCardBody.className = "card-body d-flex flex-column";

			const catName = document.createElement("h5");
			catName.className = "card-title";
			catName.innerHTML = cat.cat_name;

			const catOwner = document.createElement("p");
			catOwner.className = "card-subtitle mb-2 text-muted";
			catOwner.innerHTML = cat.owner_username;

			const catInfo = document.createElement("div");
			catInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const catBreed = document.createElement("p");
			catBreed.className = "card-text mb-0";
			catBreed.innerHTML = cat.cat_breed;

			const catAbility = document.createElement("p");
			catAbility.className = "card-text mb-1";
			catAbility.innerHTML = cat.ability_action;

			catInfo.appendChild(catBreed);
			catInfo.appendChild(catAbility);

			catCardBody.appendChild(catName);
			catCardBody.appendChild(catOwner);
			catCardBody.appendChild(catInfo);

			catCard.appendChild(catImage);
			catCard.appendChild(catCardBody);

			catCol.appendChild(catCard);

			catRow.appendChild(catCol);
		});
	};

	fetchMethod(currentUrl + `/api/owned/details`, callback, "GET", null, null);
}

function rng(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
