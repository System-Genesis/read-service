import BaseRepository from '../../repositories/base/BaseRepository';
import IDenormalizedEntity from './entity.denormalized.interface';
import EntityDenormalizedModel from './entity.denormalized.model';

export default class EntityDenormalizedRepository extends BaseRepository<IDenormalizedEntity> {
    constructor() {
        super(EntityDenormalizedModel);
    }

    getByRole(roleID: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ roleID }).exec();
    }

    findById(id_: string): Promise<IDenormalizedEntity | null> {
        // const idNum: number = Number(id_);
        return this.model.findOne({ id: id_ }).exec();
    }

    // getAll(): Promise<IDenormalizedEntity[]> {
    //     return this.model.find({}).exec();
    // }

    findUnderGroup(groupID: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ 'digitalIdentities.role.directGroup': groupID }).exec();
    }

    findUnderHierarchy(hierarchy: string): Promise<IDenormalizedEntity[]> {
        return this.model.find({ hierarchy }).exec();
    }
}
