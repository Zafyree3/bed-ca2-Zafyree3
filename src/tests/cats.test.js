const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Testing the Cats Routes", () => {
	test("Testing the POST /cats route", (done) => {
		request(app)
			.post(`/cats`)
			.send({
				cat_num: 100,
				ability_id: 1,
				breed: "test",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(201);
				done();
			});
	});

	test("Testing the GET /cats route", (done) => {
		request(app)
			.get(`/cats`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /cats/:id route", (done) => {
		request(app)
			.get(`/cats/1`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the GET /cats/:id route 404", (done) => {
		request(app)
			.get(`/cats/0`)
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /cats/:id route", (done) => {
		request(app)
			.put(`/cats/100`)
			.send({
				cat_num: 100,
				ability_id: 1,
				breed: "test",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the DELETE /cats/:id route", (done) => {
		request(app)
			.delete(`/cats/100`)
			.then((res) => {
				expect(res.statusCode).toEqual(204);
				done();
			});
	});
});
