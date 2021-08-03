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

describe('Role Tests', () => {
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

    it('Should return role from city by roleId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'role' }],
        });
        try {
            const res = await request.get('/roles/e467333225@city').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.roleId).toBe('e467333225@city');
            expect(res.body.hierarchy).toContain('/');
            expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Shouldnt return role from city by roleId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'role' }],
        });
        try {
            const res = await request.get('/roles/e467333225@city').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return role by digitalIdentityUniqueID', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'role' }],
        });
        const res = await request.get('/roles/digitalIdentity/e467333225@city.com').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('e467333225@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role by direct groupId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'role' }],
            direct: true,
        });
        const res = await request.get('/roles/group/19ew4r3d3d').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return role under groupId', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'role' }],
        });
        const res = await request.get('/roles/group/1ew4r3d3d').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Shouldnt return any role under groupId from city', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'role' }],
        });
        const res = await request.get('/roles/group/1ew4r3d3d').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return roles with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'role' }],
                updatedAt: dateFromQuery,
                page: '1',
            });
            const res = await request.get('/roles').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.every((role) => role.updatedAt >= dateFromQuery)).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
