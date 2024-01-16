// const model = require("../src/models/playerModel");
// const pool = require("../src/services/db");

const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Testing the Tasks Routes", () => {
	test("Testing the POST /tasks route", (done) => {
		request(app)
			.post("/tasks")
			.send({
				title: "test",
				description: "test",
				points: 10,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(201);
				expect(res.body.title).toEqual("test");
				expect(res.body.description).toEqual("test");
				expect(res.body.points).toEqual(10);
				done();
			});
	});

	test("Testing the POST /tasks route with 400", (done) => {
		request(app)
			.post("/tasks")
			.send({
				title: "test",
				points: 10,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(400);
				done();
			});
	});

	test("Testing the GET /tasks route", (done) => {
		request(app)
			.get("/tasks")
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /tasks/:id route", (done) => {
		request(app)
			.get("/tasks/6")
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.title).toEqual("test");
				expect(res.body.description).toEqual("test");
				expect(res.body.points).toEqual(10);
				done();
			});
	});

	test("Testing the GET /tasks/:id route with 404", (done) => {
		request(app)
			.get("/tasks/0")
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /tasks/:id route", (done) => {
		request(app)
			.put("/tasks/6")
			.send({
				title: "test2",
				description: "test2",
				points: 20,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.title).toEqual("test2");
				expect(res.body.description).toEqual("test2");
				expect(res.body.points).toEqual(20);
				done();
			});
	});

	test("Testing the PUT /tasks/:id route with 404", (done) => {
		request(app)
			.put("/tasks/0")
			.send({
				title: "test2",
				description: "test2",
				points: 20,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the DELETE /tasks/:id route", (done) => {
		request(app)
			.delete("/tasks/6")
			.then((res) => {
				expect(res.statusCode).toEqual(204);
				done();
			});
	});

	test("Testing the DELETE /tasks/:id route with 404", (done) => {
		request(app)
			.delete("/tasks/6")
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});
});
