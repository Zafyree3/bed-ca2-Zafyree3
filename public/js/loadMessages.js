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
				message.dataset.bsTitle = "Delete";
				message.dataset.bsToggle = "popover";
				message.dataset.bsContent = "Delete this message";
				message.dataset.bsPlacement = "left";
				message.dataset.bsHtml = "true";
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
					return `<a id="delete-msg" class="btn btn-danger"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Trash_font_awesome.svg" width=30 /></a>`;
				},
			};

			const popover = new bootstrap.Popover(popoverTriggerEl, options);

			popoverTriggerEl.addEventListener("inserted.bs.popover", function () {
				const button = document.getElementById("delete-msg");

				button.addEventListener("click", function () {
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
			});
		});

		loadingScreen.classList.remove("d-block");
		loadingScreen.classList.add("d-none");
	};

	loadingScreen.classList.remove("d-none");
	loadingScreen.classList.add("d-block");

	fetchMethod(currentUrl + "/api/messages/", callback, "GET", null, token);
}
