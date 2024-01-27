document.addEventListener("DOMContentLoaded", function () {
	loadGacha();
});

function loadGacha() {
	const gachaRow = document.getElementById("box-row");

	const callback = (status, data) => {
		console.log(data);

		gachaRow.innerHTML = "";
		data.forEach((gacha) => {
			const gachaCol = document.createElement("div");
			gachaCol.className = "col-md-3";

			const gachaCard = document.createElement("div");
			gachaCard.className = "card w-100 h-100";

			const gachaImage = document.createElement("img");
			gachaImage.className = "card-img-top";
			gachaImage.src = `https://zayzaf-3.sirv.com/images/gachas/gacha_${gacha.box_id}.png`;

			const gachaCardBody = document.createElement("div");
			gachaCardBody.className = "card-body d-flex flex-column";

			const gachaName = document.createElement("h5");
			gachaName.className = "card-title mb-0";
			gachaName.innerHTML = gacha.name;

			const gachaInfo = document.createElement("div");
			gachaInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const gachaDescription = document.createElement("p");
			gachaDescription.className = "card-text";
			gachaDescription.innerHTML = gacha.description;

			const gachaPrice = document.createElement("p");
			gachaPrice.className = "card-text mt-auto";
			gachaPrice.innerHTML = "Price: " + gacha.price + " points";

			const gachaFooter = document.createElement("div");
			gachaFooter.className = "card-footer";

			const gachaButton = document.createElement("button");
			gachaButton.className = "btn btn-info";
			gachaButton.innerHTML = "Buy";

			gachaButton.addEventListener("click", () => {
				buyGacha(gacha.box_id);
			});

			gachaFooter.appendChild(gachaButton);

			gachaInfo.appendChild(gachaDescription);
			gachaInfo.appendChild(gachaPrice);

			gachaCardBody.appendChild(gachaName);
			gachaCardBody.appendChild(gachaInfo);
			gachaCardBody.appendChild(gachaFooter);

			gachaCard.appendChild(gachaImage);
			gachaCard.appendChild(gachaCardBody);

			gachaCol.appendChild(gachaCard);

			gachaRow.appendChild(gachaCol);
		});
	};

	fetchMethod(currentUrl + "/api/shop/gachas", callback, "GET");
}
