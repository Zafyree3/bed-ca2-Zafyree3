document.addEventListener("DOMContentLoaded", function () {
	loadCompleted();
});

function loadCompleted() {
	const token = localStorage.getItem("token");
	const completedDiv = document.getElementById("completed-row");
	const loadingScreen = document.getElementById("loading-screen");

	const callback = (status, data) => {
		if (status !== 200) {
			const wrapper = document.getElementById("completed-task-wrapper");
			wrapper.hidden = true;

			createErrorToast(data.error);

			// if (status === 401) {
			// 	const refreshToken = localStorage.getItem("refresh");

			// 	const callback = (status, data) => {
			// 		loadingScreen.classList.remove("d-block");
			// 		loadingScreen.classList.add("d-none");

			// 		if (status === 200) {
			// 			localStorage.setItem("token", data.token);
			// 			localStorage.setItem("refresh", data.refresh);
			// 			location.reload();
			// 		} else {
			// 			localStorage.removeItem("token");
			// 			localStorage.removeItem("refresh");
			// 			window.location.href = "login.html";
			// 		}
			// 	};

			// 	const data = {
			// 		refreshToken: refreshToken,
			// 	};

			// 	loadingScreen.classList.remove("d-none");
			// 	loadingScreen.classList.add("d-block");

			// 	fetchMethod(currentUrl + "/api/refresh", callback, "POST", data);
			// }

			checkStatusForRefresh(status);

			return;
		}
		console.log(data);
		completedDiv.innerHTML = "";

		if (data.length == 0) {
			const wrapper = document.getElementById("completed-task-wrapper");
			wrapper.hidden = true;
		} else {
			const wrapper = document.getElementById("completed-task-wrapper");
			wrapper.hidden = false;
		}

		data.forEach((task) => {
			const completedCol = document.createElement("div");
			completedCol.className = "col-md-3";

			const completedCard = document.createElement("div");
			completedCard.className = "card w-100 h-100";

			const completedCardBody = document.createElement("div");
			completedCardBody.className = "card-body d-flex flex-column";

			const completedHeader = document.createElement("div");
			completedHeader.className = "card-header";

			const completedTitle = document.createElement("h5");
			completedTitle.className = "card-title";
			completedTitle.innerHTML = task.title;

			const completedInfo = document.createElement("div");
			completedInfo.className =
				"d-flex flex-column justify-content-between flex-grow-1";

			const completedDate = document.createElement("p");
			completedDate.className = "card-text fst-italic mt-2";
			completedDate.innerHTML = task.completion_date;

			const completedNotes = document.createElement("p");
			completedNotes.className = "card-text mt-auto text-start mb-2";
			completedNotes.innerHTML = task.notes;

			const completedFooter = document.createElement("div");
			completedFooter.className = "card-footer";

			const completedEditButton = document.createElement("button");
			completedEditButton.className = "btn btn-info";
			completedEditButton.innerHTML = "Edit";

			completedEditButton.addEventListener("click", function () {
				const modal = new bootstrap.Modal(document.getElementById("editModal"));
				const modalTextArea = document.getElementById("editNotes");
				const editModalSubmit = document.getElementById("editModalSubmit");

				modalTextArea.value = task.notes;

				editModalSubmit.addEventListener("click", function () {
					const token = localStorage.getItem("token");

					loadingScreen.classList.remove("d-none");
					loadingScreen.classList.add("d-block");

					const callback = (status, data) => {
						console.log(data);
						loadCompleted();
						modal.hide();

						loadingScreen.classList.remove("d-block");
						loadingScreen.classList.add("d-none");
					};

					const data = {
						progress_id: task.progress_id,
						notes: modalTextArea.value,
					};

					fetchMethod(
						currentUrl + `/api/task_progress/${data.progress_id}`,
						callback,
						"PUT",
						data,
						token
					);
				});

				modal.show();
			});
			completedInfo.appendChild(completedDate);
			completedInfo.appendChild(completedNotes);

			completedFooter.appendChild(completedEditButton);

			completedHeader.appendChild(completedTitle);

			completedCardBody.appendChild(completedHeader);
			completedCardBody.appendChild(completedInfo);
			completedCardBody.appendChild(completedFooter);

			completedCard.appendChild(completedCardBody);
			completedCard.dataset.id = task.progress_id;

			completedCol.appendChild(completedCard);

			completedDiv.appendChild(completedCol);
		});

		loadingScreen.classList.remove("d-block");
		loadingScreen.classList.add("d-none");
	};

	if (token === null) {
		const wrapper = document.getElementById("completed-task-wrapper");
		wrapper.hidden = true;
	} else {
		loadingScreen.classList.remove("d-none");
		loadingScreen.classList.add("d-block");

		fetchMethod(
			currentUrl + "/api/task_progress/user",
			callback,
			"GET",
			null,
			token
		);
	}
}
