document.addEventListener("DOMContentLoaded", function () {
	const token = localStorage.getItem("token");

	if (token) {
		loadMessage(token);
	} else {
		loadMessage(null);
	}
});

function loadMessage(token) {
	const loadingScreen = document.getElementById("loading-screen");

	const callback = (status, data) => {
		if (status !== 200) {
			createErrorToast(data.error);

			checkStatusForRefresh(status);

			return;
		}

		const messageDiv = document.getElementById("messages-container");
		messageDiv.innerHTML = "";

		data.forEach((messages) => {
			const username = messages.username;
			const message_text = messages.message_text;
			const own_message = messages.own_message;

			const message = document.createElement("a");

			message.classList.add(
				"message",
				"d-inline-flex",
				"flex-column",
				"p-3",
				"bg-opacitty-50",
				"rounded-3",
				"text-white"
			);

			const messageHeader = document.createElement("div");
			messageHeader.classList.add("message-header");

			if (own_message == 1) {
				message.classList.add("align-self-end");
				messageHeader.classList.add("text-end");
				message.dataset.bsToggle = "popover";
				message.dataset.bsPlacement = "left";
				message.dataset.bsHtml = "true";
				message.dataset.msg = message_text;
				//message.dataset.bsTrigger = "focus";

				//message.popover();
			} else {
				message.classList.add("align-self-start");
				messageHeader.classList.add("text-start");
			}

			message.dataset.messageId = messages.id;
			message.dataset.own_message = messages.own_message;

			const messageUsername = document.createElement("h4");
			messageUsername.classList.add("message-username");
			messageUsername.innerText = username;

			const messageContent = document.createElement("p");
			messageContent.classList.add("message-content", "text-start", "mb-0");
			messageContent.innerText = message_text;

			messageHeader.appendChild(messageUsername);
			message.appendChild(messageHeader);
			message.appendChild(messageContent);

			messageDiv.appendChild(message);
		});

		messageDiv.scrollTop = messageDiv.scrollHeight;

		const popoverTriggerList = document.querySelectorAll(
			'[data-bs-toggle="popover"]'
		);

		popoverTriggerList.forEach((popoverTriggerEl) => {
			const options = {
				html: true,
				trigger: "click",
				content: function () {
					return `<div class="d-flex gap-3"><a id="delete-msg" class="btn btn-danger">
						<img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg" width=30 />
						</a>
						<a id="edit-msg" class="btn btn-info">
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/480px-Edit_icon_%28the_Noun_Project_30184%29.svg.png" width=30 />
						</a>
						</div>`;
				},
			};

			const popover = new bootstrap.Popover(popoverTriggerEl, options);

			popoverTriggerEl.addEventListener("inserted.bs.popover", function () {
				const deleteButton = document.getElementById("delete-msg");
				const editButton = document.getElementById("edit-msg");

				deleteButton.addEventListener("click", function () {
					const messageId = popoverTriggerEl.dataset.messageId;

					const callback = (status, data) => {
						if (status == 200) {
							loadMessage(token);
							popover.hide();
						} else {
							createErrorToast(data.error);

							checkStatusForRefresh(status);

							return;
						}
					};

					fetchMethod(
						currentUrl + "/api/messages/" + messageId,
						callback,
						"DELETE",
						null,
						token
					);
				});

				editButton.addEventListener("click", function () {
					const messageId = popoverTriggerEl.dataset.messageId;

					const editModal = new bootstrap.Modal(
						document.getElementById("editModal")
					);

					const editModalSubmit = document.getElementById("editModalSubmit");
					const editText = document.getElementById("editMessage");

					editModalSubmit.addEventListener("click", function () {
						const token = localStorage.getItem("token");

						loadingScreen.classList.remove("d-none");
						loadingScreen.classList.add("d-block");

						const callback = (status, data) => {
							console.log(data);
							loadMessage(token);
							editModal.hide();

							loadingScreen.classList.remove("d-block");
							loadingScreen.classList.add("d-none");
						};

						const data = {
							message_text: editText.value,
						};

						fetchMethod(
							currentUrl + `/api/messages/${messageId}`,
							callback,
							"PUT",
							data,
							token
						);
					});

					editText.value = popoverTriggerEl.dataset.msg;

					editModal.show();
					popover.hide();
				});
			});
		});

		loadingScreen.classList.remove("d-block");
		loadingScreen.classList.add("d-none");
	};

	loadingScreen.classList.remove("d-none");
	loadingScreen.classList.add("d-block");

	fetchMethod(currentUrl + "/api/messages/", callback, "GET", null, token);
}
