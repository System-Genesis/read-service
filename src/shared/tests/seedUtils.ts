/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

import mongoose, { Types, Connection } from 'mongoose';
import { EntitySchema } from '../../entity/entity.model';
import connection from '../infra/mongoose/connection';

const getModel = (modelName: string) => {
    let model;
    if (connection.modelNames().includes(modelName)) {
        model = connection.model(modelName);
    } else {
        model = connection.model(modelName, EntitySchema);
    }
    return model;
};
const EntityModel = connection.model('entity', EntitySchema);
const GroupModel = connection.model('group', EntitySchema);
const RoleModel = connection.model('role', EntitySchema);
const DigitalIdentityModel = connection.model('digitalIdentity', EntitySchema);

const allEntitiesDB = require('../../../mongo-seed/entityDNs');
const allGroupsDB = require('../../../mongo-seed/organizationGroupsDNs');
const allRolesDB = require('../../../mongo-seed/roleDNs');
const allDIsDB = require('../../../mongo-seed/digitalIdentitiesDNs');

const createEntityFromMock = (mockEntity: any) => {
    return {
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(mockEntity.createdAt),
        updatedAt: new Date(mockEntity.updatedAt),
        ...mockEntity,
    };
};
const createRoleFromMock = (mockEntity: any) => {
    return {
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(mockEntity.createdAt),
        updatedAt: new Date(mockEntity.updatedAt),
        ...mockEntity,
    };
};
const createDIFromMock = (mockEntity: any) => {
    return {
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(mockEntity.createdAt),
        updatedAt: new Date(mockEntity.updatedAt),
        ...mockEntity,
    };
};
const createGroupFromMock = (mockEntity: any) => {
    return {
        _id: new mongoose.Types.ObjectId(),
        createdAt: new Date(mockEntity.createdAt),
        updatedAt: new Date(mockEntity.updatedAt),
        ...mockEntity,
    };
};

export const insertEntity = async <T>(entity: Object) => {
    const mappedData = createEntityFromMock(entity);
    return EntityModel.create(mappedData);
};

export const seedCollection = async <T>(dataJson: any[], createFromMockFunc: (any) => any, dataModel: mongoose.Model<T>) => {
    const mappedData = dataJson.map((obj) => createFromMockFunc(obj));
    return dataModel.insertMany(mappedData);
};

export const seedDB = async () => {
    await seedCollection(allEntitiesDB, createEntityFromMock, EntityModel);
    await seedCollection(allRolesDB, createRoleFromMock, RoleModel);
    await seedCollection(allGroupsDB, createGroupFromMock, GroupModel);
    await seedCollection(allDIsDB, createDIFromMock, DigitalIdentityModel);
};

export const emptyDB = async () => {
    await EntityModel.remove({});
    await RoleModel.remove({});
    await GroupModel.remove({});
    await DigitalIdentityModel.remove({});
};

export const isEmptyDB = async () => {
    const EntityLength = await EntityModel.count({});
    const RoleLength = await RoleModel.count({});
    const GroupLength = await GroupModel.count({});
    const DigitalIdentityLength = await DigitalIdentityModel.count({});
    return EntityLength > 0 && RoleLength > 0 && GroupLength && DigitalIdentityLength > 0;
};
