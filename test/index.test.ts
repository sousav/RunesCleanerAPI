import {connect} from "mongoose";
import {describe} from "mocha";
import {agent as request} from 'supertest';
import api from '../src/app/app';

before((done) => {
    connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(connection => {
        connection.connection.db.dropDatabase();
        done();
    }, _ => {
        console.error("Database connection failed.")
    });
});

describe("Index Test", () => {
    it('should return 404', () => {
        return request(api)
            .get('/api/404')
            .expect(404)
    });

    it('should handle OPTIONS', () => {
        return request(api)
            .options('/api/404')
            .expect(204)
    });
});

import './auth.test'
import './placeholder.test'