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
    it('Should return user by id', async () => {
        res = await request.get('/entity/73dr4e3s233');
        expect(res['body'].id).toBe('73dr4e3s233');
    });

    it('Should return user by identifier', async () => {
        res = await request.get('/entity/identifier/8257994');
        expect(res['body'].personalNumber).toBe('8257994');
    });

    it('Should return user by digitalIdentity', async () => {
        res = await request.get('/entity/digitalIdentity/e261976729@city.com');
        expect(res['body'].digitalIdentities).toContainEqual(expect.objectContaining({ uniqueId: 'e261976729@city.com' }));
    });
});
