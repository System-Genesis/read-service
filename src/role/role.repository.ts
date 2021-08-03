import * as mongoose from 'mongoose';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository {
    protected model: mongoose.Model<IRole & mongoose.Document>;

    constructor() {
        this.model = RoleModel;
    }

    // ancestorsToHierarchy = (ancestors: any[], excluders) => {
    //     const hierarchyIds = ancestors.map((ancestor) => ancestor.id);
    //     const hierarchy = ancestors.map((ancestor) => ancestor.name).join('/');
    //     return { hierarchy, hierarchyIds };
    // };

    findByQuery(query: any, excluders) {
        const findQuery = this.model.find({ query, ...excluders });
        return findQuery.lean<IRole[]>().exec();
    }

    findByRoleId(roleId: string, excluders) {
        const findQuery = this.model.findOne({ roleId, ...excluders });
        return findQuery.lean().exec();
    }

    findByDigitalIdentity(uniqueId: string, excluders) {
        const findQuery = this.model.findOne({ digitalIdentityUniqueId: uniqueId, ...excluders });
        return findQuery.lean().exec();
    }

    findInGroupId(groupId: string, excluders) {
        const findQuery = this.model.find({ directGroup: groupId, ...excluders });
        return findQuery.lean().exec();
    }

    findUnderGroupId(groupId: string, excluders) {
        const findQuery = this.model.find({
            hierarchyIds: groupId,
            ...excluders,
        });
        return findQuery.lean().exec();
    }

    // async findByRoleId(roleId: string) {
    //     const rolesWithAncestors = await this.model
    //         .aggregate([
    //             { $match: { roleId } },
    //             {
    //                 $graphLookup: {
    //                     from: 'groups',
    //                     startWith: '$directGroup',
    //                     connectFromField: 'directGroup',
    //                     connectToField: 'id',
    //                     as: 'ancestors',
    //                     maxDepth: 100,
    //                 },
    //             },
    //         ])
    //         .exec();

    //     if (!rolesWithAncestors || rolesWithAncestors.length !== 1) throw new Error();
    //     let [roleWithAncestors] = rolesWithAncestors;
    //     const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(roleWithAncestors.ancestors);
    //     roleWithAncestors = Object.assign(roleWithAncestors, { hierarchy, hierarchyIds });
    //     return roleWithAncestors;
    // }

    // async findByDigitalIdentity(uniqueId: string) {
    //     // let found = this.model.findOne({ roleId }).exec();
    //     const rolesWithAncestors = await this.model
    //         .aggregate([
    //             { $match: { digitalIdentityUniqueId: uniqueId } },
    //             {
    //                 $graphLookup: {
    //                     from: 'groups',
    //                     startWith: '$directGroup',
    //                     connectFromField: 'directGroup',
    //                     connectToField: 'id',
    //                     as: 'ancestors',
    //                     maxDepth: 100,
    //                 },
    //             },
    //         ])
    //         .exec();
    //     if (!rolesWithAncestors || rolesWithAncestors.length !== 1) throw new Error();
    //     let [roleWithAncestors] = rolesWithAncestors;
    //     const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(roleWithAncestors.ancestors);
    //     roleWithAncestors = Object.assign(roleWithAncestors, { hierarchy, hierarchyIds });
    //     return roleWithAncestors;
    // }
}
