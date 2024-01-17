document.addEventListener("DOMContentLoaded", function () {
	//Checks whether the page loaded
	const signupForm = document.getElementById("signupForm"); // looks for the signup form
	const warningCard = document.getElementById("warningCard"); // looks for the warning card
	const warningText = document.getElementById("warningText"); // looks for the warning text

	signupForm.addEventListener("submit", function (event) {
		// creates a listener when the form is submitted
		event.preventDefault();

		const username = document.getElementById("username").value; // gets the value of the username
		const email = document.getElementById("email").value; // gets the value of the email
		const password = document.getElementById("password").value; // gets the value of the password
		const confirmPassword = document.getElementById("confirmPassword").value; // gets the value of the confirm password

		// Perform signup logic
		if (password === confirmPassword) {
			// checks if password and confirm password are the same
			console.log("Signup successful");
			console.log("Username:", username);
			console.log("Email:", email);
			console.log("Password:", password);
			warningCard.classList.add("d-none");

			const data = {
				// create payload
				username: username,
				email: email,
				password: password,
			};

			const callback = (responseStatus, responseData) => {
				// created the callback function
				console.log("responseStatus:", responseStatus);
				console.log("responseData:", responseData);
				if (responseStatus == 200) {
					// Check if signup was successful
					if (responseData.token) {
						// Store the token in local storage
						localStorage.setItem("token", responseData.token);
						// Redirect or perform further actions for logged-in user
						window.location.href = "profile.html";
					}
				} else {
					warningCard.classList.remove("d-none");
					warningText.innerText = responseData.error;
				}
			};

			// Perform signup request
			fetchMethod(currentUrl + "/api/register", callback, "POST", data);

			// Reset the form fields
			signupForm.reset();
		} else {
			// Passwords do not match, handle error
			warningCard.classList.remove("d-none");
			warningText.innerText = "Passwords do not match";
		}
	});
});
