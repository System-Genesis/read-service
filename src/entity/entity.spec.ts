/* eslint-disable no-await-in-loop */
import { query } from 'express';
/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
import * as qs from 'qs';
// import allEntitiesDB from '../../mongo-seed/entityDNs.json';
// import EntityControlleimportr from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';

const allEntitiesDB = require('../../mongo-seed/entityDNs');

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Entity Unit Tests', () => {
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
    // let res: Response;
    it('Should return entity from city by id', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        try {
            const res = await request.get('/entities/73dr4e3s233').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('73dr4e3s233');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Shouldnt return entity from city by id out of scope', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        try {
            const res = await request.get('/entities/73dr4e3s233').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entity by identifier', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        const res = await request.get('/entities/identifier/8257994').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('8257994');
    });

    it('Should return entity by digitalIdentity', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        const res = await request.get('/entities/digitalIdentity/gf603940726@city.com').query(qsQuery);

        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('1730993');
    });

    it('Should return entity by roleId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        const res = await request.get('/entities/role/e261976729@city').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('8257994');
    });

    it('Should return entities under hierarchy string', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            limit: '10',
            expanded: true,
        });
        const encodedHierarchy = encodeURIComponent('wallmart/nobis/sit');
        const res = await request.get(`/entities/hierarchy/${encodedHierarchy}`).query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.entities.length).toBeGreaterThan(0);
    });

    it('Should return entities under group id', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            limit: '10',
            expanded: true,
        });
        const res = await request.get('/entities/group/2ew4r3d3d').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.entities.length).toBeGreaterThan(0);
    });

    it('Should return entities with entity type filter', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            limit: '10',
            expanded: true,
        });
        const res = await request.get('/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.entities.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
    });

    it('Should return entities with custom filter expanded', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            limit: '10',
            expanded: true,
        });
        const res = await request.get('/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.entities.length).toBe(10);
        expect(res.body.entities.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res.body.entities.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
    });

    it('Should return first page of all digimon entities', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            limit: '10',
            expanded: true,
        });
        const res = await request.get('/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.entities.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res.body.entities.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
    });

    it('Should iterate through all pages of all entities', async () => {
        try {
            let page;
            let foundEntities = [];
            while (true) {
                const qsQuery = qs.stringify({
                    ruleFilters: [{ field: 'source', values: [''], entityType: 'digitalIdentity' }],
                    page,
                    limit: '200',
                    expanded: true,
                });
                const res = await request.get('/entities').query(qsQuery);
                expect(res.status).toBe(200);
                foundEntities = foundEntities.concat(res.body.entities);
                const { nextPage } = res.body;
                if (res.body.entities.length === 0 || !nextPage) {
                    break;
                }
                page = nextPage;
            }
            expect(foundEntities.length).toBe(allEntitiesDB.length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entities with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-07-27';
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'role' }],
                updatedAt: dateFromQuery,
                page: '1',
                limit: '10',
            });
            const res = await request.get('/entities').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.entities.every((entity) => entity.updatedAt >= dateFromQuery)).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entities with entity type filter and rule scope not city', async () => {
        try {
            const res = await request.get('/entities').query(
                qs.stringify({
                    ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
                    entityType: 'digimon',
                    page: '1',
                    limit: '10',
                    expanded: true,
                }),
            );
            expect(res.status).toBe(200);
            expect(res.body.entities.every((entity) => entity.digitalIdentities.every((di) => di.source !== 'city_name'))).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
