document.addEventListener("DOMContentLoaded", function () {
	const usernameText = document.getElementById("username-text");
	const emailText = document.getElementById("useremail-text");
	const pointsText = document.getElementById("userpoints-text");

	const uri = "/api/users/profile";

	const callback = (status, data) => {
		if (status == 200) {
			usernameText.innerText = data.username;
			emailText.innerText = data.email;
			pointsText.innerText = data.points;
		} else {
			console.error("Error loading user data");
		}
	};

	const token = localStorage.getItem("token");

	fetchMethod(currentUrl + uri, callback, "GET", null, token);
});
