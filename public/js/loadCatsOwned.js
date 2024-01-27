document.addEventListener("DOMContentLoaded", function () {
	loadCatsOwned();
});

function rng(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadCatsOwned() {
	const token = localStorage.getItem("token");
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
			catCol.dataset.name = cat.cat_name;

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

			const catInfo = document.createElement("div");
			catInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const catBreed = document.createElement("p");
			catBreed.className = "card-text";
			catBreed.innerHTML = cat.cat_breed;

			const catAbility = document.createElement("p");
			catAbility.className = "card-text mb-3";
			catAbility.innerHTML = cat.ability_action;

			const catFooter = document.createElement("div");
			catFooter.className = "card-footer";

			const catButton = document.createElement("button");
			catButton.className = "btn btn-info";
			catButton.innerHTML = "Edit";

			catButton.addEventListener("click", function () {
				editCat(cat.cat_id, cat.cat_name);
			});

			catFooter.appendChild(catButton);

			catInfo.appendChild(catBreed);
			catInfo.appendChild(catAbility);

			catCardBody.appendChild(catName);
			catCardBody.appendChild(catInfo);
			catCardBody.appendChild(catFooter);

			catCard.appendChild(catImage);
			catCard.appendChild(catCardBody);

			catCol.appendChild(catCard);

			catRow.appendChild(catCol);
		});
	};

	fetchMethod(currentUrl + "/api/owned/owner", callback, "GET", null, token);
}
