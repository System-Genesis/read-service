/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

import * as mongoose from 'mongoose';
import { EntityModel } from '../../entity/entity.model';
import { RoleModel } from '../../role/role.model';
import { DigitalIdentityModel } from '../../digitalIdentity/digitalIdentity.model';
import { GroupModel } from '../../group/group.model';

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