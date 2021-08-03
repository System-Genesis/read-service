import * as mongoose from 'mongoose';
import IEntity from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityDenormalizedRepository {
    protected model: mongoose.Model<IEntity & mongoose.Document>;

    private static DENORMALIZED_FIELDS = '-digitalIdentities';

    constructor() {
        this.model = EntityModel;
    }

    convertExcludedFields = (fieldsToDelete: string[]): string => {
        return `-${fieldsToDelete.join(' -')}`;
    };

    find(queries: any, scopeQuery: any, expanded: boolean, pageNumber: number, limit: number) {
        let findQuery = this.model
            .find({ ...queries, ...scopeQuery })
            .skip(pageNumber * 10)
            .limit(10);
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        //
        return findQuery.lean().exec();
    }

    findOne(cond: any, excluders, expanded?: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ cond, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    // findOr(keys: string[], values: string[], populate?: boolean) {
    //     const cond = keys.map((key) => {
    //         return { [key]: { $in: values } };
    //     });

    //     return this.find({ $or: cond });
    // }

    findByIdentifier(identifier: string, excluders, expanded?: boolean): Promise<IEntity | null> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [identifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond, ...excluders });
        let foundRes = findQuery;
        if (!expanded) {
            foundRes = foundRes.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return foundRes.lean<IEntity | null>().exec();
    }

    findByUniqueId(uniqueId: string, excluders, expanded?: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.uniqueId': uniqueId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findByRole(roleID: string, excluders, expanded?: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.role.roleId': roleID, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findById(id_: string, excluders, expanded?: boolean) {
        // const idNum: number = Number(id_);
        let findQuery = this.model.findOne({ id: id_, ...excluders }).select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findUnderGroup(groupID: string, excluders, expanded?: boolean): Promise<IEntity[]> {
        let findQuery = this.model.find({ 'digitalIdentities.role.directGroup': groupID, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded?: boolean): Promise<IEntity[]> {
        let findQuery = this.model.find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>().exec();
    }
}
