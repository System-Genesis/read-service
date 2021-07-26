/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import * as qs from 'qs';
// import EntityController from './entity.controller';
// import { EntityModel } from './entity.model';

import Server from '../express/server';

const server = new Server(8000);
server.start();
const requestSuper = request(server.app);
// requestSuper.set('Content-Type', 'application/json');

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
    it('Should return entity by id', () => {
        requestSuper
            .get('/entity/id/73dr4e3s233')
            .expect(200)
            .end((err, res) => {
                expect(res.body.id).toBe('73dr4e3s233');
            });
    });

    it('Should return entity by identifier', () => {
        requestSuper.get('/entity/identifier/8257994').end((err, res) => {
            expect(res.body.personalNumber).toBe('8257994');
        });
    });

    it('Should return entity by digitalIdentity', () => {
        requestSuper.get('/entity/digitalIdentity/e261976729@city.com').end((err, res) => {
            expect(res.body.personalNumber).toBe('8257994');
        });
    });

    it('Should return entity by roleId', () => {
        requestSuper.get('/entity/role/e261976729@city').end((err, res) => {
            expect(res.body.personalNumber).toBe('8257994');
        });
    });

    it('Should return entities under hierarchy string', () => {
        const encodedHierarchy = encodeURIComponent('wallmart/nobis/sit');
        requestSuper.get(`/entity/hierarchy/${encodedHierarchy}`).end((err, res) => {
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('Should return entities under group id', () => {
        requestSuper.get('/entity/group/74').end((err, res) => {
            expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('Should return entities with entity type filter', () => {
        requestSuper
            .get('/entity')
            .query({ entityType: 'digimon', page: '1' })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body.every((entity) => entity.entityType === 'digimon')).toBeTruthy();
            });
    });

    it('Should return entities with custom filter expanded', async () => {
        const userFilters = [{ field: 'entityType', value: 'digimon', entityType: 'entity' }];
        requestSuper
            .get('/entity')
            .query(qs.stringify({ userFilters, page: '1', expanded: true }))
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(
                    res.body.every((entity) => {
                        return entity.digitalIdentities.every((DI) => DI.role !== undefined);
                    }),
                ).toBeTruthy();
            });
    });

    it('Should return entities with updated from filter', async () => {
        const dateFromQuery = '2021-06-06T07:25:45.363Z';
        requestSuper
            .get('/entity')
            .query({ updateFrom: dateFromQuery, page: '1' })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body.every((entity) => entity.updateFrom >= dateFromQuery)).toBeTruthy();
            });
    });

    it('Should return entities with entity type filter and rule scope not city', async () => {
        requestSuper
            .get('/entity')
            .query(
                qs.stringify({
                    ruleFilters: [{ field: 'source', values: ['city_name'], entityType: 'digitalIdentity' }],
                    entityType: 'digimon',
                    page: '1',
                    expanded: true,
                }),
            )
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body.every((entity) => entity.digitalIdentities.every((di) => di.source !== 'city_name'))).toBeTruthy();
            });
    });
});
