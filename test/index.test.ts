import { describe } from "mocha";
import { connect } from "mongoose";
import { agent as request } from "supertest";

import { app as api } from "../src/app/app";

import "./auth.test";
import "./placeholder.test";

before((done) => {
    connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then((connection) => {
        connection.connection.db.dropDatabase();
        done();
    },      (_) => {
        console.error("Database connection failed.");
    });
});

describe("Index Test", () => {
    it("should return 404", () =>
        request(api)
            .get("/api/404")
            .expect(404));

    it("should handle OPTIONS", () =>
        request(api)
            .options("/api/404")
            .expect(204));
});
