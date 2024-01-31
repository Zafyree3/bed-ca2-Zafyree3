function checkStatusForRefresh(status) {
	const loadingScreen = document.getElementById("loading-screen");

	if (status == 401) {
		const refreshToken = localStorage.getItem("refresh");

		const callback = (status, data) => {
			console.log("hiding loading screen");

			loadingScreen.classList.remove("d-block");
			loadingScreen.classList.add("d-none");

			if (status === 200) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("refresh", data.refresh);
				location.reload();
			} else {
				localStorage.removeItem("token");
				localStorage.removeItem("refresh");
				window.location.href = "login.html";
			}
		};

		const data = {
			refreshToken: refreshToken,
		};

		console.log("showing loading screen");

		loadingScreen.classList.remove("d-none");
		loadingScreen.classList.add("d-block");

		fetchMethod(currentUrl + "/api/refresh", callback, "POST", data);
	}
}
