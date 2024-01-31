document.addEventListener("DOMContentLoaded", () => {
	const token = localStorage.getItem("token");
	const loadingScreen = document.getElementById("loading-screen");

	const tasksCallback = (status, data) => {
		const taskCount = data.length;

		const completedCount = data.filter((task) => {
			return task.completed == 1;
		}).length;

		console.log(taskCount);
		console.log(completedCount);

		new Chart(document.getElementById("completed-chart"), {
			type: "pie",
			data: {
				labels: ["Completed", "Incomplete"],
				datasets: [
					{
						label: "Tasks",
						backgroundColor: [
							"rgba( 42, 245, 109, 0.2)",
							"rgba(143, 42, 245, 0.2)",
						],
						hoverBackgroundColor: [
							"rgba( 42, 245, 109, 0.5)",
							"rgba(143, 42, 245, 0.5)",
						],
						borderColor: ["rgb( 42, 245, 109)", "rgb(143, 42, 245)"],
						data: [completedCount, taskCount - completedCount],
						hoverOffset: 50,
					},
				],
			},
			options: {
				aspectRatio: 1,
				plugins: {
					legend: {
						labels: {
							color: "#fff",
						},
					},
				},
			},
		});
	};

	const catsCallback = (status, data) => {
		const catCount = data.length;

		const catBreedCount = {};

		console.log(data);

		data.forEach((cat) => {
			let breed = cat.cat_breed;
			breed = breed.replace("Cat", "").trim();
			if (catBreedCount[breed] == undefined) {
				catBreedCount[breed] = 1;
			} else {
				catBreedCount[breed] += 1;
			}
		});

		console.log(Object.keys(catBreedCount));
		console.log(Object.values(catBreedCount));

		new Chart(document.getElementById("cats-chart"), {
			type: "radar",
			data: {
				labels: Object.keys(catBreedCount),
				datasets: [
					{
						label: "Cats",
						data: Object.values(catBreedCount),
						fill: true,
						backgroundColor: "rgba(143, 42, 245, 0.2)",
						borderColor: "rgb(143, 42, 245)",
						pointBackgroundColor: "rgb(143, 42, 245)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(143, 42, 245)",
					},
				],
			},
			options: {
				scales: {
					r: {
						angleLines: {
							color: "rgba(255, 255, 255, 0.2)",
						},
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							backdropColor: "rgba(0, 0, 0, 0)",
							color: "#fff",
						},
						pointLabels: {
							color: "#fff",
						},
						grid: {
							color: "rgba(255, 255, 255, 0.2)",
						},
					},
				},
				plugins: {
					legend: {
						labels: {
							color: "#fff",
						},
					},
				},
			},
		});
	};

	const transcationCallback = (status, data) => {
		let pointList = [0];
		data.forEach((transaction) => {
			pointList.push(transaction.points);
		});

		new Chart(document.getElementById("points-chart"), {
			type: "line",
			data: {
				labels: pointList,
				datasets: [
					{
						label: "Points",
						data: pointList,
						fill: true,
						backgroundColor: "rgba(42, 245, 143, 0.2)",
						borderColor: "rgb(42, 245, 143)",
						pointBackgroundColor: "rgb(42, 245, 143)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgb(42, 245, 143)",
						xAxisId: "xAxis",
					},
				],
			},
			options: {
				aspectRatio: 1,
				scales: {
					x: {
						display: false,
						grid: {
							color: "rgba(255, 255, 255, 0.2)",
						},
					},
					y: {
						ticks: {
							backdropColor: "rgba(0, 0, 0, 0)",
							color: "#fff",
						},
						grid: {
							color: "rgba(255, 255, 255, 0.2)",
						},
					},
				},
				plugins: {
					legend: {
						labels: {
							color: "#fff",
						},
					},
				},
			},
		});
	};

	fetchMethod(
		currentUrl + "/api/transactions/user",
		transcationCallback,
		"GET",
		null,
		token
	);

	fetchMethod(
		currentUrl + "/api/owned/owner",
		catsCallback,
		"GET",
		null,
		token
	);

	fetchMethod(
		currentUrl + "/api/tasks/user",
		tasksCallback,
		"GET",
		null,
		token
	);
});
