import { query } from 'express';
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
    it('Should return entity by id', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            expanded: true,
        });
        try {
            const res = await request.get('/entities/id/73dr4e3s233').query(qsQuery);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe('73dr4e3s233');
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });

    it('Should return entity by identifier', async () => {
        const res = await request.get('/entities/identifier/8257994');
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('8257994');
    });

    it('Should return entity by digitalIdentity', async () => {
        const res = await request.get('/entities/digitalIdentity/e261976729@city.com');
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('8257994');
    });

    it('Should return entity by roleId', async () => {
        const res = await request.get('/entities/role/e261976729@city');
        expect(res.status).toBe(200);
        expect(res.body.personalNumber).toBe('8257994');
    });

    it('Should return entities under hierarchy string', async () => {
        const encodedHierarchy = encodeURIComponent('wallmart/nobis/sit');
        const res = await request.get(`/entities/hierarchy/${encodedHierarchy}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return entities under group id', async () => {
        const res = await request.get('/entities/group/74');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('Should return entities with entity type filter', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            page: '1',
            expanded: true,
        });
        const res = await request.get('/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
    });

    it('Should return entities with custom filter expanded', async () => {
        const qsQuery = qs.stringify({
            ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
            entityType: 'digimon',
            page: '1',
            expanded: true,
        });
        const res = await request.get('/entities').query(qsQuery);
        expect(res.status).toBe(200);
        expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res.body.every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
        expect(
            res.body.every((entity) => {
                return entity.digitalIdentities.every((DI) => DI.role !== undefined);
            }),
        ).toBeTruthy();
    });

    it('Should return entities with updated from filter', async () => {
        try {
            const dateFromQuery = '2021-06-06T07:25:45.363Z';
            const res = await request.get('/entities').query({ updateFrom: dateFromQuery, page: '1' });
            expect(res.status).toBe(200);
            expect(res.body.every((entity) => entity.updateFrom >= dateFromQuery)).toBeTruthy();
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
                    expanded: true,
                }),
            );
            expect(res.status).toBe(200);
            expect(res.body.every((entity) => entity.digitalIdentities.every((di) => di.source !== 'city_name'))).toBeTruthy();
        } catch (err) {
            expect(!err).toBeTruthy();
        }
    });
    // it('Should return user by digitalIdentity', async () => {
    //     const res = await request.get('/entities/digitalIdentity/e261976729@city.com');
    //     expect(res.body.digitalIdentities).toContainEqual(expect.objectContaining({ personalNumber: '8257994' }));
    // });
});
