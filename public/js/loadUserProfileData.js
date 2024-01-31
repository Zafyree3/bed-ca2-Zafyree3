document.addEventListener("DOMContentLoaded", function () {
	const usernameText = document.getElementById("username-text");
	const emailText = document.getElementById("useremail-text");
	const pointsText = document.getElementById("userpoints-text");
	const loadingScreen = document.getElementById("loading-screen");

	const uri = "/api/users/profile";

	const callback = (status, data) => {
		if (status == 200) {
			usernameText.innerText = data.username;
			emailText.innerText = data.email;
			pointsText.innerText = data.points;

			loadingScreen.classList.remove("d-block");
			loadingScreen.classList.add("d-none");
		} else {
			createErrorToast(data.error);

			checkStatusForRefresh(status);
		}
	};

	const token = localStorage.getItem("token");

	loadingScreen.classList.remove("d-none");
	loadingScreen.classList.add("d-block");

	fetchMethod(currentUrl + uri, callback, "GET", null, token);
});
