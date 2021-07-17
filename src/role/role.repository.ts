import BaseRepository from '../repositories/base/BaseRepository';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository extends BaseRepository<IRole> {
    constructor() {
        super(RoleModel);
    }

    getByRoleId(roleID: string, populated?: boolean): Promise<IRole | null> {
        const found = this.model.findOne({ roleID }).exec();
        this.model.aggregate([
            { "$match": { "_id": 5 } },
            {
                "$graphLookup": {
                    "from": "roles",
                    "startWith": "$_id",
                    "connectFromField": "_id",
                    "connectToField": "ancestors",
                    "as": "people",
                    "depthField": "depth",
                }
            },
            {
                "$addFields": {
                    "people": {
                        "$filter": {
                            "input": "$people",
                            "cond": { "$eq": ["$$this.last", "Dor"] }
                        }
                    }
                }
            }
        ])
        return found;
    }
}
