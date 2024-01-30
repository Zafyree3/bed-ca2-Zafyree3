function createErrorToast(body) {
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
			toastBody.innerText = body

			toastHeader.appendChild(toastTitle);
			toastHeader.appendChild(toastTime);
			toastHeader.appendChild(toastCloseButton);

			toast.appendChild(toastHeader);
			toast.appendChild(toastBody);

			toastContainer.appendChild(toast);
}