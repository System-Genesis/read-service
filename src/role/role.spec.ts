/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import { Response } from 'express';
import supertest from 'supertest';
import qs from 'qs';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';
import { seedDB, emptyDB } from '../shared/tests/seedUtils';

import Server from '../express/server';
const allRolesDB = require('../../mongo-seed/roleDNs');

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Role Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(`mongodb://nitro:password123@localhost:27017/kartoffelMock`, {
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

    it('Should return role from city by roleId', async () => {
        const qsQuery = qs.stringify({});
        try {
            const res = await request.get('/api/roles/i97156618@city').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.roleId).toBe('i97156618@city');
            expect(res.body.hierarchy).toContain('/');
            expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return role from city by roleId - insensitive case', async () => {
        const qsQuery = qs.stringify({});
        try {
            const res = await request.get('/api/roles/I97156618@City').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.roleId).toBe('i97156618@city');
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
            const res = await request.get('/api/roles/i97156618@city').query(qsQuery);
            expect(res.status).toBe(404);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return role by digitalIdentityUniqueID', async () => {
        const qsQuery = qs.stringify({});
        const res = await request.get('/api/roles/digitalIdentity/i97156618@turtle.com').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('i97156618@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role by digitalIdentityUniqueID - insensitive case', async () => {
        const qsQuery = qs.stringify({});
        const res = await request.get('/api/roles/digitalIdentity/I97156618@tURtle.com').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('i97156618@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role by direct groupId', async () => {
        const qsQuery = qs.stringify({
            pageSize: 50,
            direct: true,
        });
        const res = await request.get('/api/roles/group/611b5cf2a7a257532f054da5').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return role under groupId', async () => {
        const qsQuery = qs.stringify({
            pageSize: 50,
        });
        const res = await request.get('/api/roles/group/611b5cf2a7a257532f054da5').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Shouldnt return any role under groupId from es', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['es_name'], entityType: 'role' }],
            pageSize: 50,
        });
        const res = await request.get('/api/roles/group/611b5cf2a7a257532f054da5').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(0);
    });

    it('Should return roles with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                ruleFilters: [{ field: 'source', values: [''], entityType: 'role' }],
                updatedFrom: dateFromQuery,
                pageNum: 1,
                pageSize: 50,
            });
            const res = await request.get('/api/roles').query(qsQuery);
            expect(res.status).toBe(200);
            expect(
                res.body.every((role) => {
                    return new Date(role.updatedAt) >= new Date(dateFromQuery);
                }),
            ).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should iterate through all pages of all roles', async () => {
        try {
            let pageNum = 1;
            let foundRoles = [];
            while (true) {
                const qsQuery = qs.stringify({
                    ruleFilters: [{ field: 'source', values: [''], entityType: 'role' }],
                    pageNum,
                    pageSize: '100',
                });
                const res = await request.get('/api/roles').query(qsQuery);
                expect(res.status).toBe(200);
                foundRoles = foundRoles.concat(res.body);
                const nextPage = pageNum + 1;
                if (res.body.length === 0) {
                    break;
                }
                pageNum = nextPage;
            }
            expect(foundRoles.length).toBe(allRolesDB.length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
