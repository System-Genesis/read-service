import * as mongoose from 'mongoose';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository {
    protected model: mongoose.Model<IRole & mongoose.Document>;

    constructor() {
        this.model = RoleModel;
    }

    ancestorsToHierarchy = (ancestors: any[]) => {
        const hierarchyIds = ancestors.map((ancestor) => ancestor.id);
        const hierarchy = ancestors.map((ancestor) => ancestor.name).join('/');
        return { hierarchy, hierarchyIds };
    };

    // findByRoleId(roleId: string) {
    //     const findQuery = this.model.findOne({ roleId });
    //     return findQuery.lean().exec();
    // }

    async findByRoleId(roleId: string) {
        const rolesWithAncestors = await this.model
            .aggregate([
                { $match: { roleId } },
                {
                    $graphLookup: {
                        from: 'organizationGroups',
                        startWith: '$directGroup',
                        connectFromField: 'directGroup',
                        connectToField: 'id',
                        as: 'ancestors',
                        maxDepth: 100,
                    },
                },
            ])
            .exec();

        if (!rolesWithAncestors || rolesWithAncestors.length !== 1) throw new Error();
        let [roleWithAncestors] = rolesWithAncestors;
        const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(roleWithAncestors.ancestors);
        roleWithAncestors = Object.assign(roleWithAncestors, { hierarchy, ancestors: hierarchyIds });
        return roleWithAncestors;
    }

    async findByDigitalIdentity(uniqueId: string) {
        // let found = this.model.findOne({ roleId }).exec();
        const rolesWithAncestors = await this.model
            .aggregate([
                { $match: { digitalIdentityUniqueId: uniqueId } },
                {
                    $graphLookup: {
                        from: 'organizationGroups',
                        startWith: '$directGroup',
                        connectFromField: 'directGroup',
                        connectToField: 'id',
                        as: 'ancestors',
                        maxDepth: 100,
                    },
                },
            ])
            .exec();
        if (!rolesWithAncestors || rolesWithAncestors.length !== 1) throw new Error();
        let [roleWithAncestors] = rolesWithAncestors;
        const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(roleWithAncestors.ancestors);
        roleWithAncestors = Object.assign(roleWithAncestors, { hierarchy, ancestors: hierarchyIds });
        return roleWithAncestors;
    }
}
