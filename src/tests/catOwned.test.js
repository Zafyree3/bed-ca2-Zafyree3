const request = require("supertest");
const app = require("../app"); // Replace 'app' with the path to your Express.js application entry point
const fs = require("fs");
const exp = require("constants");

describe("Testing the CatsOwned Routes", () => {
	test("Testing the POST /catsOwned route", (done) => {
		request(app)
			.post(`/owned`)
			.send({
				cat_num: 1,
				cat_name: "test",
				owner_id: 1,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(201);
				expect(res.body.cat_id).toEqual(4);
				expect(res.body.cat_num).toEqual(1);
				expect(res.body.cat_name).toEqual("test");
				expect(res.body.owner_id).toEqual(1);
				done();
			});
	});

	test("Testing the GET /catsOwned route", (done) => {
		request(app)
			.get(`/owned`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /catsOwned/details route", (done) => {
		request(app)
			.get(`/owned/details`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThan(0);
				done();
			});
	});

	test("Testing the GET /catsOwned/:id/details route", (done) => {
		request(app)
			.get(`/owned/4/details`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the GET /catsOwned/owner/:id route", (done) => {
		request(app)
			.get(`/owned/owner/1`)
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the PUT /catsOwned/:id route", (done) => {
		request(app)
			.put(`/owned/4`)
			.send({
				cat_num: 1,
				cat_name: "test",
				owner_id: 1,
			})
			.then((res) => {
				expect(res.statusCode).toEqual(200);
				done();
			});
	});

	test("Testing the DELETE /catsOwned/:id route", (done) => {
		request(app)
			.delete(`/owned/4`)
			.then((res) => {
				expect(res.statusCode).toEqual(204);
				done();
			});
	});
});
