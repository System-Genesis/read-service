import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { IEntity, pictures } from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityRepository {
    protected model: mongoose.Model<IEntity>;

    private static DENORMALIZED_FIELDS = ' -digitalIdentities';

    private static HIDDEN_FIELDS = ' -hierarchyIds -pictures.profile.meta.path -__v';

    constructor() {
        this.model = EntityModel;
    }

    convertExcludedFields = (fieldsToDelete: string[]): string => {
        return `-${fieldsToDelete.join(' -')}`;
    };

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    // TODO: will work when decided how to deal with non hierarchy entities
    find(queries: any, scopeQuery: any, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ ...queries, ...scopeQuery })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>({ virtuals: true }).exec();
    }

    findOne(cond: any, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ cond, ...excluders });
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>({ virtuals: true }).exec();
    }

    // findOr(keys: string[], values: string[], populate?: boolean) {
    //     const cond = keys.map((key) => {
    //         return { [key]: { $in: values } };
    //     });

    //     return this.find({ $or: cond });
    // }

    findByIdentifier(identifier: string, excluders, expanded: boolean) {
        const identifierFields = ['personalNumber', 'identityCard', 'goalUserId'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [identifier] } };
        });

        let findQuery = this.model.findOne({ $or: cond, ...excluders });
        let foundRes = findQuery;
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            foundRes = foundRes.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return foundRes.lean<IEntity>({ virtuals: true }).exec();
    }

    findByUniqueId(uniqueId: string, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.uniqueId': { $regex: `^${uniqueId}$`, $options: 'i' }, ...excluders });
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>({ virtuals: true }).exec();
    }

    findByRole(roleId: string, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.role.roleId': { $regex: `^${roleId}$`, $options: 'i' }, ...excluders });
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>({ virtuals: true }).exec();
    }

    async findById(id_: string, excluders, expanded: boolean) {
        let findQuery = this.model.findOne({ _id: id_, ...excluders })
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean({ virtuals: true }).exec();
    }

    findUnderGroup(groupID: string, excluders, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ 'digitalIdentities.role.directGroup': groupID, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>({ virtuals: true }).exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(EntityRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>({ virtuals: true }).exec();
    }

    getPictureMetaData(personIdentifier: string): Promise<pictures> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [personIdentifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond });
        const resPicture = findQuery.select('pictures.profile');
        return resPicture.lean<pictures>({ virtuals: true }).exec() || {};
    }
}
