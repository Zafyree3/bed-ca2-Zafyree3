document.addEventListener("DOMContentLoaded", function () {
	loadInventory();
});

function loadInventory() {
	const token = localStorage.getItem("token");
	const inventoryRow = document.getElementById("item-row");

	const callback = (status, data) => {
		console.log(data);

		inventoryRow.innerHTML = "";
		data.forEach((item) => {
			const inventoryCol = document.createElement("div");
			inventoryCol.className = "col-md-3";

			inventoryCol.dataset.id = item.item_id;
			inventoryCol.dataset.owner = item.owner_id;

			const inventoryCard = document.createElement("div");
			inventoryCard.className = "card w-100 h-100";

			const inventoryImage = document.createElement("img");
			inventoryImage.className = "card-img-top";
			inventoryImage.src = `https://zayzaf-3.sirv.com/images/items/item_${item.item_num}.png`;

			const inventoryCardBody = document.createElement("div");
			inventoryCardBody.className = "card-body d-flex flex-column";

			const inventoryName = document.createElement("h5");
			inventoryName.className = "card-title";
			inventoryName.innerHTML = item.name;

			const inventoryInfo = document.createElement("div");
			inventoryInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const inventoryDescription = document.createElement("p");
			inventoryDescription.className = "card-text mb-3";
			inventoryDescription.innerHTML = item.description;

			const inventoryFooter = document.createElement("div");
			inventoryFooter.className =
				"card-footer gap-2 d-flex align-items-center justify-content-center";

			const inventoryButton = document.createElement("button");
			inventoryButton.className = "btn btn-danger";
			inventoryButton.innerHTML = "Remove";

			inventoryButton.addEventListener("click", function () {
				deleteItem(item.item_id);
			});

			let useButton;

			if (item.name == "Shipping Box") {
				useButton = document.createElement("button");
				useButton.className = "btn btn-primary";
				useButton.innerHTML = "Use";

				useButton.addEventListener("click", function () {
					useShippingBox(item.item_id);
				});

				inventoryFooter.appendChild(useButton);
			}

			inventoryFooter.appendChild(inventoryButton);

			inventoryInfo.appendChild(inventoryDescription);

			inventoryCardBody.appendChild(inventoryName);
			inventoryCardBody.appendChild(inventoryInfo);
			inventoryCardBody.appendChild(inventoryFooter);

			inventoryCard.appendChild(inventoryImage);
			inventoryCard.appendChild(inventoryCardBody);

			inventoryCol.appendChild(inventoryCard);

			inventoryRow.appendChild(inventoryCol);
		});
	};

	if (token === null) {
		const wrapper = document.getElementById("inventory-wrapper");
		wrapper.hidden = true;
	} else {
		fetchMethod(
			currentUrl + "/api/inventory/owner",
			callback,
			"GET",
			null,
			token
		);
	}
}
