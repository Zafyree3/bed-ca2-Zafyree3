document.addEventListener("DOMContentLoaded", function () {
	loadTasks();
});

function loadTasks() {
	const loadingScreen = document.getElementById("loading-screen");
	const taskDiv = document.getElementById("task-row");

	const callback = (status, data) => {
		console.log(data);

		taskDiv.innerHTML = "";
		data.forEach((task) => {
			const taskCol = document.createElement("div");
			taskCol.className = "col-md-3";

			const taskCard = document.createElement("div");
			taskCard.className = "card w-100 h-100";

			const taskCardBody = document.createElement("div");
			taskCardBody.className = "card-body d-flex flex-column";

			const taskHeader = document.createElement("div");
			taskHeader.className = "card-header";

			const taskTitle = document.createElement("h5");
			taskTitle.className = "card-title mb-0";
			taskTitle.innerHTML = task.title;

			const taskInfo = document.createElement("div");
			taskInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const taskDescription = document.createElement("p");
			taskDescription.className = "card-text";
			taskDescription.innerHTML = task.description;

			const taskPoints = document.createElement("p");
			taskPoints.className = "card-text mt-auto";
			taskPoints.innerHTML = "Points: " + task.points + " points";

			const taskFooter = document.createElement("div");
			taskFooter.className = "card-footer";

			const taskButton = document.createElement("button");
			taskButton.className = "btn btn-info";
			taskButton.innerHTML = "Completed?";

			// if (task.completed == 1) {
			// 	taskButton.disabled = true;
			// }

			taskButton.addEventListener("click", function () {
				loadingScreen.classList.remove("d-none");
				loadingScreen.classList.add("d-block");

				const token = localStorage.getItem("token");

				if (token == null) {
					createErrorToast("You must be logged in to complete a task");
					loadingScreen.classList.remove("d-block");
					loadingScreen.classList.add("d-none");
					return;
				}

				const callback = (status, data) => {
					console.log(data);
					loadTasks();
					loadCompleted();

					const taskPoints = parseInt(taskCard.dataset.points);

					const addPointsCallback = (status, data) => {
						console.log("test");
						const transCallback = (status, data) => {
							console.log("none");

							loadingScreen.classList.remove("d-block");
							loadingScreen.classList.add("d-none");
						};

						const transData = {
							points_change: taskPoints,
						};

						fetchMethod(
							currentUrl + "/api/transactions",
							transCallback,
							"POST",
							transData,
							token
						);
					};

					const Pointsdata = {
						points: taskPoints,
					};

					fetchMethod(
						currentUrl + "/api/users/points/add",
						addPointsCallback,
						"PUT",
						Pointsdata,
						token
					);
				};

				const data = {
					task_id: task.task_id,
					completion_date: new Date()
						.toISOString()
						.slice(0, 19)
						.replace("T", " "),
					notes: "Add notes here",
				};

				fetchMethod(
					currentUrl + "/api/task_progress/",
					callback,
					"POST",
					data,
					token
				);
			});

			taskInfo.appendChild(taskDescription);
			taskInfo.appendChild(taskPoints);

			taskHeader.appendChild(taskTitle);

			taskCardBody.appendChild(taskInfo);

			taskFooter.appendChild(taskButton);

			taskCard.appendChild(taskHeader);
			taskCard.appendChild(taskCardBody);
			taskCard.appendChild(taskFooter);

			// if (task.completed == 1) {
			// 	taskCard.classList.add("bg-success", "text-white", "bg-opacity-50");
			// }

			taskCard.dataset.id = task.task_id;
			taskCard.dataset.points = task.points;

			taskCol.appendChild(taskCard);

			taskDiv.appendChild(taskCol);
		});

		loadingScreen.classList.remove("d-block");
		loadingScreen.classList.add("d-none");
	};

	let token = localStorage.getItem("token");

	loadingScreen.classList.remove("d-none");
	loadingScreen.classList.add("d-block");

	fetchMethod(currentUrl + "/api/tasks", callback, "GET", null, token);
}
