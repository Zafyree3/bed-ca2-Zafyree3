const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Testing the User Routes", () => {
	test("Testing the POST /user route", (done) => {
		request(app)
			.post("/users")
			.send({
				username: "test",
				email: "test@test.com",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(201);
				expect(res.body.username).toEqual("test");
				expect(res.body.email).toEqual("test@test.com");
				done();
			});
	});

	test("Testing the GET /user route", (done) => {
		request(app)
			.get("/users")
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /user/:id route", (done) => {
		request(app)
			.get("/users/4")
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.username).toEqual("test");
				expect(res.body.email).toEqual("test@test.com");
				done();
			});
	});

	test("Testing the GET /user/:id route with 404", (done) => {
		request(app)
			.get("/users/0")
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /user/:id route", (done) => {
		request(app)
			.put("/users/4")
			.send({
				username: "test2",
				email: "new@test.com",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.username).toEqual("test2");
				expect(res.body.email).toEqual("new@test.com");
				done();
			});
	});

	test("Testing the PUT /user/:id route with 404", (done) => {
		request(app)
			.put("/users/0")
			.send({
				username: "test2",
				email: "new@test.com",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the DELETE /user/:id route", (done) => {
		request(app)
			.delete("/users/4")
			.then((res) => {
				expect(res.statusCode).toEqual(204);
				done();
			});
	});

	test("Testing the DELETE /user/:id route with 404", (done) => {
		request(app)
			.delete("/users/4")
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});
});
