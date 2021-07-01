import BaseRepository from '../repositories/base/BaseRepository';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository extends BaseRepository<IRole> {
    constructor() {
        super(RoleModel);
    }

    getByRoleId(roleID: string, populated?: boolean): Promise<IRole | null> {
        return this.model.findOne({ roleID }).exec();
    }
}
