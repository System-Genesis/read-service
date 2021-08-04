/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
import * as qs from 'qs';

import Server from '../express/server';

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Digital Identity Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:28000/genesis`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    });
    afterAll(async () => {
        await mongoose.connection.close();
        server.stop();
    });

    it('Should return DI from city by uniqueId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'digitalIdentity' }],
        });
        try {
            const res = await request.get('/digitalIdentities/e467333225@city.com').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.uniqueId).toBe('e467333225@city.com');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Shouldnt return DI from city by uniqueId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
        });
        try {
            const res = await request.get('/digitalIdentities/e467333225@city.com').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return DI from city by roleId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'digitalIdentity' }],
        });
        try {
            const res = await request.get('/digitalIdentities/role/e467333225@city').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.uniqueId).toBe('e467333225@city.com');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return all DIs expanded', async () => {
        try {
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                page: '1',
                expanded: true,
            });
            const res = await request.get('/digitalIdentities').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.some((di) => di.role !== undefined)).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return DIs with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                updatedAt: dateFromQuery,
                page: '1',
            });
            const res = await request.get('/digitalIdentities').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((di) => di.updatedAt >= dateFromQuery)).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
