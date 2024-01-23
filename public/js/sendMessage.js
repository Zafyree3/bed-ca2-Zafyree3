document.addEventListener("DOMContentLoaded", () => {
	const messageForm = document.querySelector("#message-form");

	messageForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const messageText = document.querySelector("#message-send-input").value;

		const callback = (status, data) => {
			if (status === 201) {
				document.querySelector("#message-send-input").value = "";
				loadMessage(localStorage.getItem("token"));
			}
		};

		const token = localStorage.getItem("token");

		const body = {
			message_text: messageText,
		};

		fetchMethod(currentUrl + "/api/messages/", callback, "POST", body, token);
	});
});
