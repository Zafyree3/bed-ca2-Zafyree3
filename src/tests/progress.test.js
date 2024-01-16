const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Testing the Progress Routes", () => {
	test("Testing the POST /task_progress route", (done) => {
		request(app)
			.post("/task_progress")
			.send({
				user_id: 1,
				task_id: 1,
				completion_date: "2023-07-30",
				notes: "Planted a tree in the park near my house.",
			})
			.then((res) => {
				//console.log(res.body);
				expect(res.statusCode).toEqual(201);
				expect(res.body.user_id).toEqual(1);
				expect(res.body.task_id).toEqual(1);
				expect(res.body.completion_date).toEqual("2023-07-30");
				expect(res.body.notes).toEqual(
					"Planted a tree in the park near my house."
				);
				done();
			});
	});

	test("Testing the POST /task_progress route 404", (done) => {
		request(app)
			.post("/task_progress")
			.send({
				user_id: 100,
				task_id: 100,
				completion_date: "2023-07-30",
				notes: "Planted a tree in the park near my house.",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the POST /task_progress route 400", (done) => {
		request(app)
			.post("/task_progress")
			.send({
				user_id: 1,
				task_id: 1,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(400);
				done();
			});
	});

	test("Testing the GET /task_progress route", (done) => {
		request(app)
			.get(`/task_progress/1`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the GET /task_progress route 404", (done) => {
		request(app)
			.get("/task_progress/100")
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /task_progress route", (done) => {
		request(app)
			.put("/task_progress/1")
			.send({
				completion_date: "2023-07-30",
				notes: "Planted a tree in the park near my house.",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.completion_date).toEqual("2023-07-30");
				expect(res.body.notes).toEqual(
					"Planted a tree in the park near my house."
				);
				done();
			});
	});

	test("Testing the PUT /task_progress route 404", (done) => {
		request(app)
			.put("/task_progress/0")
			.send({
				completion_date: "2023-07-30",
				notes: "Planted a tree in the park near my house.",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /task_progress route 400", (done) => {
		request(app)
			.put("/task_progress/1")
			.send({})
			.then((res) => {
				expect(res.statusCode).toEqual(400);
				done();
			});
	});

	// test("Testing the DELETE /task_progress route", (done) => {
	// 	request(app)
	// 		.delete("/task_progress/1")
	// 		.then((res) => {
	// 			expect(res.statusCode).toEqual(200);
	// 			done();
	// 		});
	// });

	// test("Testing the DELETE /task_progress route with 404", (done) => {
	// 	request(app)
	// 		.delete("/task_progress/1")
	// 		.then((res) => {
	// 			expect(res.statusCode).toEqual(404);
	// 			done();
	// 		});
	// });
});
