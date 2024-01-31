document.addEventListener("DOMContentLoaded", function () {
	const taskText = document.querySelector("#task-text");
	const catText = document.querySelector("#cat-text");
	const pointsText = document.querySelector("#points-text");

	const loadingScreen = document.querySelector("#loading-screen");

	loadingScreen.classList.remove("d-block");
	loadingScreen.classList.add("d-none");

	const taskCallback = (status, data) => {
		if (status !== 200) {
			createErrorToast(data.error);
			return;
		}

		taskText.innerText = data.total;
	};

	const catCallback = (status, data) => {
		if (status !== 200) {
			createErrorToast(data.error);
			return;
		}

		catText.innerText = data.total;
	};

	const pointsCallback = (status, data) => {
		if (status !== 200) {
			createErrorToast(data.error);
			return;
		}

		console.log(data);

		pointsText.innerText = +data.total_spent * -1;
	};

	fetchMethod(currentUrl + "/api/transactions/spent", pointsCallback, "GET");

	fetchMethod(currentUrl + "/api/owned/count", catCallback, "GET");

	fetchMethod(currentUrl + "/api/task_progress/count", taskCallback, "GET");
});
