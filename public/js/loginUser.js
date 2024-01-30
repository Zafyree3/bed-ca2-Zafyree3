document.addEventListener("DOMContentLoaded", function () {
	const callback = (responseStatus, responseData) => {
		console.log("responseStatus:", responseStatus);
		console.log("responseData:", responseData);
		if (responseStatus == 200) {
			// Check if login was successful
			if (responseData.token) {
				// Store the token in local storage
				localStorage.setItem("token", responseData.token);
				// Redirect or perform further actions for logged-in user
				window.location.href = "profile.html";
			}
		} else {
			// warningCard.classList.remove("d-none");
			// warningText.innerText = responseData.error;
			const toastContainer = document.getElementById("toast-container");

			const toast = document.createElement("div");
			toast.classList.add("toast");
			toast.classList.add("show");
			toast.classList.add("bg-danger-subtle");
			toast.classList.add("border-0");
			toast.classList.add("text-white");
			toast.setAttribute("role", "alert");
			toast.setAttribute("aria-live", "assertive");
			toast.setAttribute("aria-atomic", "true");

			const toastHeader = document.createElement("div");
			toastHeader.classList.add("toast-header");
			toastHeader.classList.add("bg-danger-subtle");
			toastHeader.classList.add("text-white");
			toastHeader.classList.add("border-0");

			const toastTitle = document.createElement("strong");
			toastTitle.classList.add("me-auto");
			toastTitle.innerText = "Error";

			const toastTime = document.createElement("small");
			toastTime.dataset.createdAt = new Date();
			toastTime.innerText = getRelativeTime(new Date(toastTime.dataset.createdAt));

			let toastTimeInterval = window.setInterval(function () {
				toastTime.innerText = getRelativeTime(new Date(toastTime.dataset.createdAt));
			}, 1000);

			const toastCloseButton = document.createElement("button");
			toastCloseButton.classList.add("btn-close");
			// toastCloseButton.setAttribute("type", "button");
			// toastCloseButton.setAttribute("data-bs-dismiss", "toast");
			// toastCloseButton.setAttribute("aria-label", "Close");

			toastCloseButton.addEventListener("click", function () {
				toast.remove();
				clearInterval(toastTimeInterval);
			});

			const toastBody = document.createElement("div");
			toastBody.classList.add("toast-body");
			toastBody.innerText = responseData.error;

			toastHeader.appendChild(toastTitle);
			toastHeader.appendChild(toastTime);
			toastHeader.appendChild(toastCloseButton);

			toast.appendChild(toastHeader);
			toast.appendChild(toastBody);

			toastContainer.appendChild(toast);

		}
	};

	const loginForm = document.getElementById("loginForm");

	const warningCard = document.getElementById("warningCard");
	const warningText = document.getElementById("warningText");

	loginForm.addEventListener("submit", function (event) {
		console.log("loginForm.addEventListener");
		event.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const data = {
			username: username,
			password: password,
		};

		// Perform login request
		fetchMethod(currentUrl + "/api/login", callback, "POST", data);

		// Reset the form fields
		loginForm.reset();
	});
});

function getRelativeTime(past) {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

	const elapsed = new Date() - past;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
