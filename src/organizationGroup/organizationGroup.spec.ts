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
    let res: Response;
    it('Should return group by id', async () => {
        res = await request.get('/groups/id/8ew4r3d3d');
        expect(res.status).toBe(200);
        expect(res['body'].hierarchy).toContain('/');
        expect(res['body'].name).toBeTruthy();
    });
});
