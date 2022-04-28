import supertest from 'supertest';

import { app } from '../../';


describe("GET /api/gold-price/best-investment-moment", () => {
    it("Gold Price - Best Investment Moment", async () => {
        await supertest(app.getExpressApp())
            .get("/api/gold-price/best-investment-moment")
            .send({range: 5, amount: 1350000})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    }, 10000);

    it("Gold Price - Best Investment Moment - Invalid Range", async () => {
        await supertest(app.getExpressApp())
            .get("/api/gold-price/best-investment-moment")
            .send({range: -1, amount: 1350000})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
    });

    it("Gold Price - Best Investment Moment - Insufficient Data", async () => {
        await supertest(app.getExpressApp())
            .get("/api/gold-price/best-investment-moment")
            .send({range: 100, amount: 1350000})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500);
    });
});

describe("DELETE /api/cache/clear-all", () => {
    it("Cache - Clear All", async () => {
        return await supertest(app.getExpressApp())
            .delete("/api/cache/clear-all")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

afterAll(async () => {
    app.stop();
});