import { Request, Response } from 'express';
// import * as qs from 'qs';

import RoleManager from './role.manager';

class RoleController {
    static entityManager: RoleManager = new RoleManager();

    static async getByRoleId(_req: Request, res: Response) {
        const foundRole = await RoleManager.findByRoleId(_req.params.roleId);
        res.status(200).send(foundRole);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const foundRole = await RoleManager.findByDigitalIdentity(_req.params.digitalIdentityUniqueId);
        res.status(200).send(foundRole);
    }
}

export default RoleController;
