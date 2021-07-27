/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import { Response } from 'express';
import * as supertest from 'supertest';
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

    it('Should return role by roleId', async () => {
        const res = await request.get('/roles/e261976729@city');
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('e261976729@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role by digitalIdentityUniqueID', async () => {
        const res = await request.get('/roles/digitalIdentity/e261976729@city.com');
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('e261976729@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role by direct groupId', async () => {
        const res = await request.get('/roles/group/2');
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('e261976729@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });

    it('Should return role under groupId', async () => {
        const res = await request.get('/roles/group/2');
        expect(res.status).toBe(200);
        expect(res.body.roleId).toBe('e261976729@city');
        expect(res.body.hierarchy).toContain('/');
        expect(res.body.hierarchyIds.length).toBeGreaterThan(0);
    });
});
