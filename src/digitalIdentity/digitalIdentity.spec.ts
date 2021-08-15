/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
import * as qs from 'qs';

import Server from '../express/server';
import IDigitalIdentity from './digitalIdentity.interface';
import { seedDB, emptyDB } from '../shared/tests/seedDB';

const allDIDB = require('../../mongo-seed/digitalIdentitiesDNs');

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
        try {
            await emptyDB();
            await seedDB();
        } catch (err) {
            console.log(err);
        }
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

    it('Should return first page DIs expanded', async () => {
        try {
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                pageNum: 1,
                pageSize: 1000,
                expanded: true,
            });
            const res = await request.get('/digitalIdentities').query(qsQuery);
            expect(res.status).toBe(200);

            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.some((di) => di.role !== undefined)).toBeTruthy();
        } catch (err) {
            console.log('err: ', err);
            expect(!err).toBeTruthy();
        }
    });

    it('Should return DIs with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                updatedFrom: dateFromQuery,
                pageNum: 1,
                pageSize: 50,
            });
            const res = await request.get('/digitalIdentities').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(
                res.body.every((di) => {
                    return new Date(di.updatedAt) >= new Date(dateFromQuery);
                }),
            ).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should iterate through all pages of digital Identities', async () => {
        try {
            let pageNum = 1;
            let foundDIs: IDigitalIdentity[] = [];
            while (true) {
                const qsQuery = qs.stringify({
                    ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                    pageNum,
                    pageSize: '100',
                    expanded: true,
                });
                const res = await request.get('/digitalIdentities').query(qsQuery);
                expect(res.status).toBe(200);
                foundDIs = foundDIs.concat(res.body);
                const nextPage = pageNum + 1;
                if (res.body.length === 0) {
                    break;
                }
                pageNum = nextPage;
            }
            expect(foundDIs.length).toBe(allDIDB.length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
