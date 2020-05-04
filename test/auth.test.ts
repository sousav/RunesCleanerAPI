import { expect } from "chai";
import { describe } from "mocha";
import { agent as request, Response } from "supertest";

import { app as api } from "../src/app/app";

import Data from "./data";

describe("Auth Controller", () => {

    describe("Register", () => {

        context("Without request body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).post("/api/auth/register");
            });

            it("should return 400", () => {
                expect(res.status).to.be.equal(400);
            });
            it("should contain an error array", () => {
                expect(res.body).to.have.property("error").to.be.an("array");
            });
        });

        context("With a valid body", async () => {
            let res: Response;
            before(async () => {
                res = await request(api)
                    .post("/api/auth/register").send({
                        email: "testuser@mail.com",
                        password: "password"
                    });
            });

            it("should return 200", () => {
                expect(res.status).to.be.equal(200);
            });
            it("should contain a token", () => {
                expect(res.body).to.have.property("token").to.be.a("string");
            });
        });

        context("With email already used", async () => {
            let res: Response;
            before(async () => {
                res = await request(api)
                    .post("/api/auth/register").send({
                        email: "testuser@mail.com",
                        password: "password"
                    });
            });

            it("should return 409", () => {
                expect(res.status).to.be.equal(409);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

    });

    describe("Login", () => {

        context("Without request body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).post("/api/auth/login");
            });

            it("should return 400", () => {
                expect(res.status).to.be.equal(400);
            });
            it("should contain an error array", () => {
                expect(res.body).to.have.property("error").to.be.an("array");
            });
        });

        context("With a unknown email", async () => {
            let res: Response;
            before(async () => {
                res = await request(api)
                    .post("/api/auth/login").send({
                        email: "testuser2@mail.com",
                        password: "password"
                    });
            });

            it("should return 404", () => {
                expect(res.status).to.be.equal(404);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With invalid credentials", async () => {
            let res: Response;
            before(async () => {
                res = await request(api)
                    .post("/api/auth/login").send({
                        email: "testuser@mail.com",
                        password: "bad_password"
                    });
            });

            it("should return 401", () => {
                expect(res.status).to.be.equal(401);
            });
            it("should contain an error object", () => {
                expect(res.body).to.have.property("error").to.have.property("name").to.be.equal("IncorrectPasswordError");
            });
        });

        context("With valid credentials", async () => {
            let res: Response;
            before(async () => {
                res = await request(api)
                    .post("/api/auth/login").send({
                        email: "testuser@mail.com",
                        password: "password"
                    });
            });

            it("should return 200", () => {
                expect(res.status).to.be.equal(200);
            });
            it("should contain a token", () => {
                expect(res.body).to.have.property("token").to.be.a("string");
            });

            after(() => {
                Data.userInfo = res.body;
            });
        });

    });

});
