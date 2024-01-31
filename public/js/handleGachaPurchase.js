function buyGacha(id) {
	const token = localStorage.getItem("token");
	const callback = (status, data) => {
		if (status !== 200 && status !== 201) {
			createErrorToast(data.error);

			checkStatusForRefresh(status);

			return;
		}

		const modal = new bootstrap.Modal(document.getElementById("successModal"));
		const modalBody = document.getElementById("successModalBody");

		modalBody.innerHTML = `
            <p>You have successfully purchased a gacha!</p>
            <p>Check your profile to see what you got!</p>
        `;

		const redirectButton = document.createElement("button");
		redirectButton.innerHTML = "Go to profile";
		redirectButton.className = "btn btn-primary";
		redirectButton.addEventListener("click", function () {
			window.location.href = currentUrl + "/profile.html";
		});

		modalBody.appendChild(redirectButton);

		modal.show();

		loadPoints();
	};

	const data = {
		box_id: id,
	};

	fetchMethod(
		currentUrl + "/api/shop/buy/gachas",
		callback,
		"POST",
		data,
		token
	);
}
