/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
import * as qs from 'qs';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';
import IGroup from './group.interface';
import { seedDB, emptyDB } from '../shared/tests/seedDB';

const allGroupsDB = require('../../mongo-seed/organizationGroupsDNs');

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
    // TODO: GONNA WORK WHEN MOCKS HAVE DIRECTGROUP
    it('Should return children of group of city direct', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
            expanded: true,
            direct: true,
        });
        try {
            const res = await request.get('/groups/1ew4r3d3d/children').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((group) => group.directGroup === '1ew4r3d3d')).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return all descendants of group of city', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
            expanded: true,
            direct: false,
        });
        try {
            const res = await request.get('/groups/1ew4r3d3d/children').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((group) => group.ancestors.includes('1ew4r3d3d'))).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    // TODO: GONNA WORK WHEN NESTED GROUPS WILL HAVE SAME SOURCE
    it('Should not return children from city out of scope', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get('/groups/1ew4r3d3d/children').query(qsQuery);
            expect(res.body.length).toBe(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should not return children from city out of scope when direct', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'group' }],
            expanded: true,
            direct: true,
        });
        try {
            const res = await request.get('/groups/1ew4r3d3d/children').query(qsQuery);
            expect(res.body.length).toBe(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return group by hierarchy', async () => {
        const rawHierarchy = 'wallmart/magnam';
        const encodedHierarchy = encodeURIComponent(rawHierarchy);
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
            expanded: true,
        });
        try {
            const res = await request.get(`/groups/hierarchy/${encodedHierarchy}`).query(qsQuery);
            expect(`${res.body.hierarchy}/${res.body.name}`).toBe(rawHierarchy);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should iterate through all pages of all groups', async () => {
        try {
            let pageNum = 1;
            let foundGroups = [];
            while (true) {
                const qsQuery = qs.stringify({
                    ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
                    pageNum,
                    pageSize: 200,
                    expanded: true,
                });
                const res = await request.get('/groups').query(qsQuery);
                expect(res.status).toBe(200);
                foundGroups = foundGroups.concat(res.body);
                const nextPage = pageNum + 1;
                if (res.body.length === 0) {
                    break;
                }
                pageNum = nextPage;
            }
            expect(foundGroups.length).toBe(allGroupsDB.length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should iterate through all pages of city groups', async () => {
        try {
            let pageNum = 1;
            let foundGroups: IGroup[] = [];
            while (true) {
                const qsQuery = qs.stringify({
                    ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
                    pageNum,
                    pageSize: 200,
                    expanded: true,
                    source: 'city_name',
                });
                const res = await request.get('/groups').query(qsQuery);
                expect(res.status).toBe(200);
                foundGroups = foundGroups.concat(res.body);
                const nextPage = pageNum + 1;
                if (res.body.length === 0) {
                    break;
                }
                pageNum = nextPage;
            }
            expect(foundGroups.every((group) => group.source === 'city_name'));
            expect(foundGroups.length).toBe(allGroupsDB.filter((group) => group.source === 'city_name').length);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should query with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const qsQuery = qs.stringify({
                // ruleFilters: [{ field: 'source', values: [''], entityType: 'group' }],
                pageNum: 1,
                pageSize: 200,
                expanded: true,
                updatedFrom: dateFromQuery,
            });
            const res = await request.get('/groups').query(qsQuery);
            expect(res.status).toBe(200);
            expect(
                res.body.every((group) => {
                    return new Date(group.updatedAt) >= new Date(dateFromQuery);
                }),
            ).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
});
