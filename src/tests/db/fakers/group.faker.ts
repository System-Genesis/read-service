// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';
import { mongo } from 'mongoose';
import { IOrganizationGroup } from '../../../organizationGroup/organizationGroup.interface';

import enums from '../../../config/enums';

const fakeChildGroup = (parentGroup: IOrganizationGroup, isLeaf: boolean) => {
    const parentID = parentGroup.id;
    const childHier = `${parentGroup.hierarchy}/${parentGroup.name}`;
    const childAnecstors = parentGroup.ancestors.push(parentID);
    const childObj = {
        id: new mongo.ObjectId().toString(),
        name: 'root',
        ancestors: childAnecstors,
        hierarchy: childHier,
        akaUnit: faker.commerce.department(),
        status: 'active',
        isLeaf,
        directEntities: [],
    } as unknown as IOrganizationGroup;
    return childObj as IOrganizationGroup;
};

const fakeHierarchies = () => {
    const allGroups: IOrganizationGroup[] = [];
    const depth1 = 3;
    const depth2 = 5;
    const depth3 = 10;
    const rootObj = {
        id: new mongo.ObjectId().toString(),
        name: 'root',
        ancestors: [],
        hierarchy: '',
        akaUnit: 'root',
        status: 'active',
        isLeaf: false,
        directEntities: [],
    } as unknown as IOrganizationGroup;
    allGroups.push(rootObj);
    for (let i = 0; i < depth1; i += 1) {
        const childObj = fakeChildGroup(rootObj, true);
        allGroups.push(childObj);
    }
    return allGroups;
};

export { fakeHierarchies };
