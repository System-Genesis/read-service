import * as mongoose from 'mongoose';
import IDenormalizedEntity from './entity.denormalized.interface';
import EntityDenormalizedModel from './entity.denormalized.model';

export default class EntityDenormalizedRepository {
    protected model: mongoose.Model<IDenormalizedEntity & mongoose.Document>;

    private static REMOVE_DENORMALIZED_FIELDS = '-digitalIdentities';

    constructor() {
        this.model = EntityDenormalizedModel;
    }

    convertExcludedFields = (fieldsToDelete: string[]): string => {
        return `-${fieldsToDelete.join(' -')}`;
    };

    find(queries: any, scopeQuery: any, expanded: boolean, pageNumber: number, limit: number) {
        let findQuery = this.model.find({ ...queries, ...scopeQuery });
        if (!expanded) {
            findQuery = findQuery.select(EntityDenormalizedRepository.REMOVE_DENORMALIZED_FIELDS);
        }
        // console.log({ limit, pageNumber, expanded, queries });
        return findQuery.lean().exec();
    }

    findOne(cond?: any, populateOptions?: string | Object, select?: string): Promise<IDenormalizedEntity> {
        let findQuery = this.model.findOne(cond);
        if (populateOptions) {
            findQuery = findQuery.populate(populateOptions);
        }
        if (select) {
            findQuery = findQuery.select(select);
        }
        return findQuery.lean<IDenormalizedEntity>().exec();
    }

    // findOr(keys: string[], values: string[], populate?: boolean) {
    //     const cond = keys.map((key) => {
    //         return { [key]: { $in: values } };
    //     });

    //     return this.find({ $or: cond });
    // }

    getByRole(roleID: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ roleID }).lean<IDenormalizedEntity[]>().exec();
    }

    findById(id_: string) {
        // const idNum: number = Number(id_);
        return this.model.findOne({ id: id_ }).select(EntityDenormalizedRepository.REMOVE_DENORMALIZED_FIELDS).lean().exec();
    }

    // getAll(): Promise<IDenormalizedEntity[]> {
    //     return this.model.find({}).exec();
    // }

    findUnderGroup(groupID: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ 'digitalIdentities.role.directGroup': groupID }).lean<IDenormalizedEntity[]>().exec();
    }

    findUnderHierarchy(hierarchy: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ hierarchy }).lean<IDenormalizedEntity[]>().exec();
    }
}
