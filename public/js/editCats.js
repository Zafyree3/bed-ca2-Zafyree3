function editCat(id, name) {
	const modal = new bootstrap.Modal(document.getElementById("editModal"));
	const modalTextArea = document.getElementById("editName");
	const editModalSubmit = document.getElementById("editModalSubmit");

	modalTextArea.value = name;

	editModalSubmit.addEventListener("click", function () {
		const token = localStorage.getItem("token");

		const callback = (status, data) => {
			console.log(data);
			loadCatsOwned();
			modal.hide();
		};

		const data = {
			cat_name: modalTextArea.value,
		};

		fetchMethod(currentUrl + `/api/owned/${id}`, callback, "PUT", data, token);
	});

	modal.show();
}
