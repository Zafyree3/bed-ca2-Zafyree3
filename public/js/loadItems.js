document.addEventListener("DOMContentLoaded", function () {
	loadItem();
});

function loadItem() {
	const itemRow = document.getElementById("item-row");
	const loadingScreen = document.getElementById("loading-screen");

	const callback = (status, data) => {
		console.log(data);

		itemRow.innerHTML = "";
		data.forEach((item) => {
			const itemCol = document.createElement("div");
			itemCol.className = "col-md-3";

			const itemCard = document.createElement("div");
			itemCard.className = "card w-100 h-100";

			const itemImage = document.createElement("img");
			itemImage.className = "card-img-top";
			itemImage.src = `https://zayzaf-3.sirv.com/images/items/item_${item.item_num}.png`;

			const itemCardBody = document.createElement("div");
			itemCardBody.className = "card-body d-flex flex-column";

			const itemName = document.createElement("h5");
			itemName.className = "card-title mb-0";
			itemName.innerHTML = item.name;

			const itemInfo = document.createElement("div");
			itemInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const itemDescription = document.createElement("p");
			itemDescription.className = "card-text";
			itemDescription.innerHTML = item.description;

			const itemPrice = document.createElement("p");
			itemPrice.className = "card-text mt-auto";
			itemPrice.innerHTML = "Price: " + item.price + " points";

			const itemFooter = document.createElement("div");
			itemFooter.className = "card-footer";

			const itemButton = document.createElement("button");
			itemButton.className = "btn btn-info";
			itemButton.innerHTML = "Buy";

			itemButton.addEventListener("click", function () {
				buyItem(item.item_num);
			});

			itemFooter.appendChild(itemButton);

			itemInfo.appendChild(itemDescription);
			itemInfo.appendChild(itemPrice);

			itemCardBody.appendChild(itemName);
			itemCardBody.appendChild(itemInfo);
			itemCardBody.appendChild(itemFooter);

			itemCard.appendChild(itemImage);
			itemCard.appendChild(itemCardBody);

			itemCol.appendChild(itemCard);

			itemRow.appendChild(itemCol);
		});

		loadingScreen.classList.remove("d-block");
		loadingScreen.classList.add("d-none");
	};

	loadingScreen.classList.add("d-block");
	loadingScreen.classList.remove("d-none");

	fetchMethod(currentUrl + "/api/shop/items", callback, "GET");
}
