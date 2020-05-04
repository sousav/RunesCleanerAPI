import { expect } from "chai";
import { describe } from "mocha";
import { Types } from "mongoose";
import { agent as request, Response } from "supertest";

import { app as api } from "../src/app/app";

import Data from "./data";

describe("Placeholder's Controller", () => {

    describe("Gets", () => {
        let res: Response;
        before(async () => {
            res = await request(api).get("/api/placeholders");
        });

        it("should return 200", () => {
            expect(res.status).to.be.equal(200);
        });
        it("should return an empty array", () => {
            expect(res.body).to.be.an("array").to.have.length(0);
        });

    });

    describe("Post", () => {

        context("Without credentials", () => {
            let res: Response;
            before(async () => {
                res = await request(api).post("/api/placeholders");
            });

            it("should return 403", () => {
                expect(res.status).to.be.equal(403);
            });
            it("should contain an error array", () => {
                expect(res.body).to.have.property("error").to.be.equal("Insufficient privileges.");
            });
        });

        context("Without request body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).post("/api/placeholders")
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 500", () => {
                expect(res.status).to.be.equal(500);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With a valid body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).post("/api/placeholders")
                    .set("Authorization", `Bearer ${Data.userInfo.token}`)
                    .send({
                        name: "test placeholder"
                    });
            });

            it("should return 201", () => {
                expect(res.status).to.be.equal(201);
            });
            it("should contain the right name", () => {
                expect(res.body).to.have.property("name").to.be.equal("test placeholder");
            });

            after(() => {
                Data.placeholderInfo = res.body;
            });
        });

    });

    describe("Get", () => {

        context("With invalid ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).get("/api/placeholders/bad_id");
            });

            it("should return 500", () => {
                expect(res.status).to.be.equal(500);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With an unknown ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).get(`/api/placeholders/${String(Types.ObjectId())}`);
            });

            it("should return 404", () => {
                expect(res.status).to.be.equal(404);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With an valid ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).get(`/api/placeholders/${Data.placeholderInfo._id}`);
            });

            it("should return 200", () => {
                expect(res.status).to.be.equal(200);
            });
            it("should contain the right object", () => {
                expect(res.body).to.have.property("_id").to.be.equal(Data.placeholderInfo._id);
                expect(res.body).to.have.property("name").to.be.equal(Data.placeholderInfo.name);
            });
        });

    });

    describe("Put", () => {

        context("Without credentials", () => {
            let res: Response;
            before(async () => {
                res = await request(api).put(`/api/placeholders/${Data.placeholderInfo._id}`);
            });

            it("should return 403", () => {
                expect(res.status).to.be.equal(403);
            });
            it("should contain an error array", () => {
                expect(res.body).to.have.property("error").to.be.equal("Insufficient privileges.");
            });
        });

        context("With invalid ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).put("/api/placeholders/bad_id")
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 500", () => {
                expect(res.status).to.be.equal(500);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With an unknown ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).put(`/api/placeholders/${String(Types.ObjectId())}`)
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 404", () => {
                expect(res.status).to.be.equal(404);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("Without request body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).put(`/api/placeholders/${Data.placeholderInfo._id}`)
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 202", () => {
                expect(res.status).to.be.equal(202);
            });
            it("should return an unmodified object", () => {
                expect(res.body).to.have.property("_id").to.be.equal(Data.placeholderInfo._id);
                expect(res.body).to.have.property("name").to.be.equal(Data.placeholderInfo.name);
            });
        });

        context("With a valid body", () => {
            let res: Response;
            before(async () => {
                res = await request(api).put(`/api/placeholders/${Data.placeholderInfo._id}`)
                    .set("Authorization", `Bearer ${Data.userInfo.token}`)
                    .send({
                        name: "Modified name"
                    });
            });

            it("should return 202", () => {
                expect(res.status).to.be.equal(202);
            });
            it("should return an unmodified object", () => {
                expect(res.body).to.have.property("_id").to.be.equal(Data.placeholderInfo._id);
                expect(res.body).to.have.property("name").to.be.equal("Modified name");
            });

            after(() => {
                Data.placeholderInfo = res.body;
            });
        });

    });

    describe("Delete", () => {

        context("Without credentials", () => {
            let res: Response;
            before(async () => {
                res = await request(api).delete(`/api/placeholders/${Data.placeholderInfo._id}`);
            });

            it("should return 403", () => {
                expect(res.status).to.be.equal(403);
            });
            it("should contain an error array", () => {
                expect(res.body).to.have.property("error").to.be.equal("Insufficient privileges.");
            });
        });

        context("With invalid ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).delete("/api/placeholders/bad_id")
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 500", () => {
                expect(res.status).to.be.equal(500);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With an unknown ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).delete(`/api/placeholders/${String(Types.ObjectId())}`)
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 404", () => {
                expect(res.status).to.be.equal(404);
            });
            it("should contain an error message", () => {
                expect(res.body).to.have.property("error").to.be.a("string");
            });
        });

        context("With a valid ID", () => {
            let res: Response;
            before(async () => {
                res = await request(api).delete(`/api/placeholders/${Data.placeholderInfo._id}`)
                    .set("Authorization", `Bearer ${Data.userInfo.token}`);
            });

            it("should return 204", () => {
                expect(res.status).to.be.equal(204);
            });
        });

    });

});
