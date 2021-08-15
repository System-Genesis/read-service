import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { IEntity, ProfilePictureData } from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityRepository {
    protected model: mongoose.Model<IEntity>;

    private static DENORMALIZED_FIELDS = '-digitalIdentities -hierarchyIds';

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

    find(queries: any, scopeQuery: any, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ ...queries, ...scopeQuery })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>().exec();
    }

    findOne(cond: any, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ cond, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    // findOr(keys: string[], values: string[], populate?: boolean) {
    //     const cond = keys.map((key) => {
    //         return { [key]: { $in: values } };
    //     });

    //     return this.find({ $or: cond });
    // }

    findByIdentifier(identifier: string, excluders, expanded: boolean): Promise<IEntity | null> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [identifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond, ...excluders });
        let foundRes = findQuery;
        if (!expanded) {
            foundRes = foundRes.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return foundRes.lean<IEntity | null>().exec();
    }

    findByUniqueId(uniqueId: string, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.uniqueId': uniqueId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findByRole(roleID: string, excluders, expanded: boolean): Promise<IEntity> {
        let findQuery = this.model.findOne({ 'digitalIdentities.role.roleId': roleID, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findById(id_: string, excluders, expanded: boolean) {
        // const idNum: number = Number(id_);
        let findQuery = this.model.findOne({ id: id_, ...excluders }).select(EntityRepository.DENORMALIZED_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity>().exec();
    }

    findUnderGroup(groupID: string, excluders, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ 'digitalIdentities.role.directGroup': groupID, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded: boolean, page: number, pageSize: number): Promise<IEntity[]> {
        let findQuery = this.model
            .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        if (!expanded) {
            findQuery = findQuery.select(EntityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IEntity[]>().exec();
    }

    getPictureMetaData(personIdentifier: string): Promise<ProfilePictureData> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [personIdentifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond });
        const resPicture = findQuery.select('pictures.profile');
        return resPicture.lean<ProfilePictureData>().exec() || {};
    }
}
