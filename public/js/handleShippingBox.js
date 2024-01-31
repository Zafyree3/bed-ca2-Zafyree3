function useShippingBox(item_id) {
	const token = localStorage.getItem("token");

	if (token === null) {
		createErrorToast("You must be logged in to use items.");
		return;
	}

	const callback = (status, data) => {
		const modal = new bootstrap.Modal(document.getElementById("shippingModal"));
		const catSelect = document.getElementById("shippingCatSelect");

		catSelect.innerHTML = "";
		data.forEach((cat) => {
			const option = document.createElement("option");
			option.value = cat.cat_id;
			option.innerHTML = cat.cat_name;
			catSelect.appendChild(option);
		});

		const getUsersCallback = (status, data) => {
			const userSelect = document.getElementById("shippingUserSelect");

			userSelect.innerHTML = "";
			data.forEach((user) => {
				const option = document.createElement("option");
				option.value = user.user_id;
				option.innerHTML = user.username;
				userSelect.appendChild(option);
			});

			const submitButton = document.getElementById("shippingModalSubmit");

			submitButton.addEventListener("click", function () {
				const cat_id = catSelect.value;
				const user_id = userSelect.value;

				const callback = (status, data) => {
					if (status === 200) {
						createSuccessToast("Shipping box used successfully.");

						const removeItemCallback = (status, data) => {
							if (status === 204) {
								createSuccessToast("Shipping box removed successfully.");
								modal.hide();
							} else {
								createErrorToast(data.message);
							}
						};

						fetchMethod(
							currentUrl + "/api/inventory/" + item_id,
							removeItemCallback,
							"DELETE",
							null,
							token
						);
					} else {
						createErrorToast(data.message);
					}
				};

				const data = {
					owner_id: user_id,
				};

				fetchMethod(
					currentUrl + "/api/owned/" + cat_id,
					callback,
					"PUT",
					data,
					token
				);
			});

			modal.show();
		};

		fetchMethod(
			currentUrl + "/api/users",
			getUsersCallback,
			"GET",
			null,
			token
		);
	};

	fetchMethod(currentUrl + "/api/owned/owner", callback, "GET", null, token);
}
