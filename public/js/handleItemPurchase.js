function buyItem(id) {
	const token = localStorage.getItem("token");
	const callback = (status, data) => {
		console.log(data);

		if (status !== 200 && status !== 201) {
			return;
		}

		const modal = new bootstrap.Modal(document.getElementById("successModal"));

		const modalBody = document.getElementById("successModalBody");

		modalBody.innerHTML = `
			<p>You have successfully purchased an item!</p>
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
	};

	const data = {
		item_num: id,
	};

	fetchMethod(currentUrl + "/api/shop/buy", callback, "POST", data, token);
}
