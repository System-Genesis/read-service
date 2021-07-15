/* eslint-disable no-restricted-syntax */
import { Response } from 'express';
import setupDB from '../tests/db/test-setup';
import * as supertest from 'supertest';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';

const server = new Server(8000);
server.start();
const request = supertest(server.app);

setupDB('genesis', true);

describe('Entity Unit Tests', () => {
    let res: Response;
    it('Should return entity by id', async () => {
        res = await request.get('/entity/id/73dr4e3s233');
        expect(res['body'].id).toBe('73dr4e3s233');
    });

    it('Should return entity by identifier', async () => {
        res = await request.get('/entity/identifier/8257994');
        expect(res['body'].personalNumber).toBe('8257994');
    });

    it('Should return entity by digitalIdentity', async () => {
        res = await request.get('/entity/digitalIdentity/e261976729@city.com');
        expect(res['body'].personalNumber).toBe('8257994');
    });

    it('Should return entities under hierarchy string', async () => {
        const encodedHierarchy = encodeURIComponent('wallmart/nobis/sit');
        res = await request.get(`/entity/hierarchy/${encodedHierarchy}`);
        expect(res['body'].length).toBeGreaterThan(0);
    });

    it('Should return entities under group id', async () => {
        res = await request.get('/entity/group/74');
        expect(res['body'].length).toBeGreaterThan(0);
    });

    it('Should return entities with entity type filter', async () => {
        res = await request.get('/entity').query({ entityType: 'digimon' });
        expect(res['body'].every((entity) => entity.entityType === 'digimon')).toBeTruthy();
    });

    it('Should return entities with custom filter expanded', async () => {
        res = await request.get('/entity').query({ entityType: 'digimon', expanded: true });
        expect(res['body'].every((entity) => entity.entityType === 'digimon')).toBeTruthy();
        expect(res['body'].every((entity) => entity.digitalIdentities.length >= 0)).toBeTruthy();
        expect(
            res['body'].every((entity) => {
                return entity.digitalIdentities.every((DI) => DI.role !== undefined);
            }),
        ).toBeTruthy();
    });

    it('Should return entities with updated from filter', async () => {
        const dateFromQuery = '2021-06-06T07:25:45.363Z';
        res = await request.get('/entity').query({ updateFrom: dateFromQuery });
        expect(res['body'].every((entity) => entity.updateFrom >= dateFromQuery)).toBeTruthy();
    });
    // it('Should return user by digitalIdentity', async () => {
    //     res = await request.get('/entity/digitalIdentity/e261976729@city.com');
    //     expect(res['body'].digitalIdentities).toContainEqual(expect.objectContaining({ personalNumber: '8257994' }));
    // });
});
