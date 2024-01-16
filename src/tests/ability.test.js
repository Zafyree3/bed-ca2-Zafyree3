const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");

describe("Testing the Ability Routes", () => {
	test("Testing the POST /ability route", (done) => {
		request(app)
			.post(`/ability`)
			.send({
				ability_id: 100,
				action: "test",
				description: "test",
			})
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toEqual(201);
				expect(res.body.ability_id).toEqual(100);
				expect(res.body.action).toEqual("test");
				expect(res.body.description).toEqual("test");
				done();
			});
	});

	test("Testing the GET /ability route", (done) => {
		request(app)
			.get(`/ability`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /ability/:id route", (done) => {
		request(app)
			.get(`/ability/100`)
			.then((res) => {
				console.log(res.body);
				expect(res.statusCode).toEqual(200);
				expect(res.body.action).toEqual("test");
				expect(res.body.description).toEqual("test");
				done();
			});
	});

	test("Testing the GET /ability/:id route 404", (done) => {
		request(app)
			.get(`/ability/0`)
			.then((res) => {
				expect(res.statusCode).toEqual(404);
				done();
			});
	});

	test("Testing the PUT /ability/:id route", (done) => {
		request(app)
			.put(`/ability/100`)
			.send({
				ability_id: 100,
				name: "test",
				description: "test",
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the DELETE /ability/:id route", (done) => {
		request(app)
			.delete(`/ability/100`)
			.then((res) => {
				expect(res.statusCode).toEqual(204);
				done();
			});
	});
});
