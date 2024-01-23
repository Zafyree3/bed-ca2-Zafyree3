document.addEventListener("DOMContentLoaded", function () {
	const token = localStorage.getItem("token");

	if (token) {
		loadMessage(token);
	}
});

function loadMessage(token) {
	const callback = (status, data) => {
		const messageDiv = document.getElementById("messages-container");
		messageDiv.innerHTML = "";

		data.forEach((messages) => {
			const username = messages.username;
			const message_text = messages.message_text;
			const own_message = messages.own_message;

			const message = document.createElement("div");

			message.classList.add(
				"message",
				"d-inline-flex",
				"flex-column",
				"p-3",
				"bg-opacitty-50",
				"rounded-3"
			);

			const messageHeader = document.createElement("div");
			messageHeader.classList.add("message-header");

			if (own_message == 1) {
				message.classList.add("align-self-end");
				messageHeader.classList.add("text-end");
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
	};

	fetchMethod(currentUrl + "/api/messages/", callback, "GET", null, token);
}
