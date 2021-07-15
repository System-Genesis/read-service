import BaseRepository from '../../repositories/base/BaseRepository';
import IDenormalizedEntity from './entity.denormalized.interface';
import EntityDenormalizedModel from './entity.denormalized.model';

export default class EntityDenormalizedRepository extends BaseRepository<IDenormalizedEntity> {
    constructor() {
        super(EntityDenormalizedModel);
    }

    getAll(): Promise<IDenormalizedEntity[]> {
        return this.model.find().lean<IDenormalizedEntity[]>().exec();
    }

    find(queries: any): Promise<IDenormalizedEntity[]> {
        return this.model.find(queries).lean<IDenormalizedEntity[]>().exec();
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

    findOr(keys: string[], values: string[], populate?: boolean) {
        const cond = keys.map((key) => {
            return { [key]: { $in: values } };
        });

        return this.find({ $or: cond });
    }

    getByRole(roleID: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ roleID }).lean<IDenormalizedEntity[]>().exec();
    }

    findById(id_: string): Promise<IDenormalizedEntity | null> {
        // const idNum: number = Number(id_);
        return this.model.findOne({ id: id_ }).lean<IDenormalizedEntity | null>().exec();
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
