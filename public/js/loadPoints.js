document.addEventListener("DOMContentLoaded", function () {
	loadPoints();
});

function loadPoints() {
	const token = localStorage.getItem("token");

	const callback = (status, data) => {
		if (status !== 200) {
			createErrorToast(data.error);

			checkStatusForRefresh(status);

			return;
		}

		const points = document.getElementById("points");
		points.innerHTML = data.points;
	};

	fetchMethod(currentUrl + "/api/users/points", callback, "GET", null, token);
}
