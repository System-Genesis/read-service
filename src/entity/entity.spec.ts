/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import { query, Response } from 'express';
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import supertest from 'supertest';
import qs from 'qs';
import { connect as connectDB } from '../shared/infra/mongoose/connection';
// import allEntitiesDB from '../../mongo-seed/entityDNs.json';
// import EntityControlleimportr from './entity.controller';
import { seedDB, emptyDB } from '../shared/tests/seedUtils';

import Server from '../express/server';

const allEntitiesDB = require('../../mongo-seed/entityDNs');

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Entity Unit Tests', () => {
    beforeAll(async () => {
        try {
            const replset = await MongoMemoryReplSet.create({
                replSet: {
                    name: 'rs0',
                    dbName: 'kartoffelTest',
                    storageEngine: 'wiredTiger',
                    count: 1,
                },
            });
            await replset.waitUntilRunning();
            const uri = replset.getUri();
            await connectDB(uri);

            // your code here

            // await mongoose.disconnect();
        } catch (err) {
            console.log(err);
        }
        try {
            await emptyDB();
            await seedDB();
        } catch (err) {
            console.log(err);
        }
    });
    afterAll(async () => {
        await mongoose.disconnect();
        server.stop();
    });
    // let res: Response;
    it('Should return entity from city by id', async () => {
        const qsQuery = qs.stringify({
            expanded: true,
        });
        try {
            const res = await request.get('/api/entities/611b5c58a7a257532f054a4a').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body._id).toBe('611b5c58a7a257532f054a4a');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entity by identifier', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/identifier/2612910').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('2612910');
    });

    it('Shouldnt return entity from city by identifier out of scope', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'hierarchy', values: ['wallmart'], entityType: 'entity' }],
            expanded: true,
        });
        try {
            const res = await request.get('/api/entities/identifier/2612910').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entity by digitalIdentity', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'entity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/digitalIdentity/i97156618@turtle.com').query(qsQuery);

        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('2612910');
    });

    it('Should return entity by digitalIdentity - insensitive to case', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'entity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/digitalIdentity/I97156618@turTle.com').query(qsQuery);

        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('2612910');
    });

    it('Should return entity by roleId', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/role/i97156618@city').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('2612910');
    });

    it('Should return entity by roleId - insensitive to case', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'entity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/role/I97156618@City').query(qsQuery);

        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('2612910');
    });

    it('Shouldnt return entity by roleId because doesnt exist', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'entity' }],
            expanded: true,
        });
        const res = await request.get('/api/entities/role/I1111111@City').query(qsQuery);

        expect(res.status).toBe(404);
    });

    it('Should return entities under hierarchy string', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const encodedHierarchy = encodeURIComponent('es_name/sit/saepe');
        const res = await request.get(`/api/entities/hierarchy/${encodedHierarchy}`).query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return entities under group id', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities/group/611b5cf2a7a257532f054da5').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return entities with entity type filter', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
    });

    it('Should return entities with custom filter expanded', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res.body.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
    });

    // TODO: ranks array test and implemetation
    it('Should return entities with custom filter expanded', async () => {
        const qsQuery = qs.stringify({
            ranks: ['rookie', 'champion'],
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((entity) => entity.rank === 'champion' || entity.rank === 'rookie')).toBeTruthy();
        expect(res.body.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
    });

    it('Should return entities with DIs from citys', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            'digitalIdentity.source': 'city_name',
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((entity) => entity.digitalIdentities.every((DI) => DI.source === 'city_name'))).toBeTruthy();
    });

    it('Shouldnt return entities from sf because of scope boundaries', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'hierarchy', values: ['sf_name'], entityType: 'entity' }],
            'digitalIdentity.source': 'sf_name',
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it('Should return entities with DIs non external sources', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            'digitalIdentity.source': 'NON_EXTERNAL_SOURCES',
            pageNum: 1,
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((entity) => entity.digitalIdentities.every((DI) => DI.source !== 'city_name'))).toBeTruthy();
    });

    it('Should return first page of all digimon entities', async () => {
        const qsQuery = qs.stringify({
            // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            pageSize: 50,
            expanded: true,
        });
        const res = await request.get('/api/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res.body.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
    });

    it('Should iterate through all pages of all entities', async () => {
        try {
            let pageNum = 1;
            let foundEntities = [];
            while (true) {
                const qsQuery = qs.stringify({
                    // ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                    pageNum,
                    pageSize: 200,
                    expanded: true,
                });
                const res = await request.get('/api/entities').query(qsQuery);
                expect(res.status).toBe(200);
                foundEntities = foundEntities.concat(res.body);
                const nextPage = pageNum + 1;
                if (res.body.length === 0) {
                    break;
                }
                pageNum = nextPage;
            }
            expect(foundEntities.length).toBe(allEntitiesDB.length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entities with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                // ruleFilters: [{ field: 'source', values: [''], entityType: 'role' }],
                updatedFrom: dateFromQuery,
                pageNum: 1,
                pageSize: 50,
            });
            const res = await request.get('/api/entities').query(qsQuery);
            expect(res.status).toBe(200);
            expect(
                res.body.every((entity) => {
                    return new Date(entity.updatedAt) >= new Date(dateFromQuery);
                }),
            ).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entities with entity type filter and rule scope not city', async () => {
        try {
            const res = await request.get('/api/entities').query(
                qs.stringify({
                    ruleFilters: [{ field: 'hierarchy', values: ['city_name'], entityType: 'entity' }],
                    entityType: 'digimon',
                    pageNum: 1,
                    pageSize: 50,
                    expanded: true,
                }),
            );
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((entity) => !entity.hierarchy?.startsWith('city_name'))).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
