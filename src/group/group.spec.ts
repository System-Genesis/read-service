/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
import * as qs from 'qs';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Group Tests', () => {
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

    it('Should return group from city by id', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get('/groups/4ew4r3d3d').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('4ew4r3d3d');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Shouldnt return group from city by id out of scope', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get('/groups/4ew4r3d3d').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return children of group of city', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get('/groups/0ew4r3d3d/children').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should not return children from city out of scope', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get('/groups/0ew4r3d3d/children').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
