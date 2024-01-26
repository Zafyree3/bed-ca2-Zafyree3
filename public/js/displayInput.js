document.addEventListener("DOMContentLoaded", function () {
	const token = localStorage.getItem("token");
	const messageInput = document.getElementById("message-send-input");
	const messageSendButton = document.getElementById("message-send-button");

	if (token) {
		messageInput.disabled = false;
		messageSendButton.disabled = false;
	} else {
		messageInput.disabled = true;
		messageSendButton.disabled = true;
	}
});
