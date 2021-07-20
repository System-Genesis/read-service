import { Request, Response } from 'express';
// import * as qs from 'qs';

import RoleManager from './role.manager';

class RoleController {
    static entityManager: RoleManager = new RoleManager();

    static async getById(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const entities = await RoleManager.findById(_req.params.id, isExpanded);
        res.status(200).send(entities);
    }
}

export default RoleController;
