function deleteItem(itemId) {
	const deleteModal = new bootstrap.Modal(
		document.getElementById("deleteModal"),
		{
			keyboard: false,
		}
	);
	const deleteModalSubmit = document.getElementById("deleteModalSubmit");

	deleteModalSubmit.addEventListener("click", function () {
		const token = localStorage.getItem("token");

		const callback = (status, data) => {
			if (status != 200) {
				createErrorToast(data.error);

				checkStatusForRefresh(status);

				return;
			}

			console.log(data);
			loadInventory();
			deleteModal.hide();
		};

		fetchMethod(
			currentUrl + `/api/inventory/${itemId}`,
			callback,
			"DELETE",
			null,
			token
		);
	});

	deleteModal.show();
}
