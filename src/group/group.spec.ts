/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose';
import { Response } from 'express';
import supertest from 'supertest';
import qs from 'qs';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';
import IGroup from './group.interface';
import { seedDB, emptyDB } from '../shared/tests/seedUtils';

const allGroupsDB = require('../../mongo-seed/organizationGroupsDNs');

const server = new Server(8000);
server.start();
const request = supertest(server.app);

describe('Group Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(`mongodb://nitro:password123@localhost:27017/kartoffelMock`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        try {
            await emptyDB();
            await seedDB();
        } catch (err) {}
    });
    afterAll(async () => {
        await mongoose.connection.close();
        server.stop();
    });

    it('Should return group from es by id', async () => {
        const qsQuery = qs.stringify({
            expanded: true,
        });
        try {
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body._id).toBe('611b5c58a7a257532f054a4b');
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
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b').query(qsQuery);
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
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b/children').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((group) => group.directGroup === '611b5c58a7a257532f054a4b')).toBeTruthy();
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
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b/children').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body.every((group) => group.ancestors.includes('611b5c58a7a257532f054a4b'))).toBeTruthy();
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
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b/children').query(qsQuery);
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
            const res = await request.get('/api/groups/611b5c58a7a257532f054a4b/children').query(qsQuery);
            expect(res.body.length).toBe(0);
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return group by hierarchy', async () => {
        const rawHierarchy = 'wallmart/est';
        const encodedHierarchy = encodeURIComponent(rawHierarchy);
        const qsQuery = qs.stringify({
            expanded: true,
        });
        try {
            const res = await request.get(`/api/groups/hierarchy/${encodedHierarchy}`).query(qsQuery);

            expect(`${res.body.hierarchy}/${res.body.name}`).toBe(rawHierarchy);
        } catch (err) {
            console.log('err: ', err);
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
                const res = await request.get('/api/groups').query(qsQuery);
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
                const res = await request.get('/api/groups').query(qsQuery);
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
            const res = await request.get('/api/groups').query(qsQuery);
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
