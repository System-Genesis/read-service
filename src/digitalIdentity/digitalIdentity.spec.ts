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

describe('Digital Identity Tests', () => {
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

    it('Should return DI by uniqueID', async () => {
        const res = await request.get('/digitalIdentities/gf603940726@city.com');
        expect(res.status).toBe(200);
        expect(res.body.uniqueId).toBe('gf603940726@city.com');
    });

    it('Should return DI by roleId', async () => {
        const res = await request.get('/digitalIdentities/role/e261976729@city');
        expect(res.status).toBe(200);
        expect(res.body.uniqueId).toBe('e261976729@city.com');
    });
});
