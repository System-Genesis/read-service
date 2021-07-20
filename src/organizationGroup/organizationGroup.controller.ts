import { Request, Response } from 'express';
// import * as qs from 'qs';

import GroupManager from './organizationGroup.manager';

class GroupController {
    static entityManager: GroupManager = new GroupManager();

    static async getById(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const groups = await GroupManager.findById(_req.params.id, isExpanded);
        res.status(200).send(groups);
    }
}

export default GroupController;
