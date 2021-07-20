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
    let res: Response;
    it('Should return role by roleId with hierarchy and ancestors', async () => {
        res = await request.get('/role/id/m309452312@city');
        expect(res['body'].roleId).toBe('m309452312@city');
        expect(res['body'].hierarchy).toContain('/');
        expect(res['body'].ancestors.length).toBeGreaterThan(0);
    });
});
