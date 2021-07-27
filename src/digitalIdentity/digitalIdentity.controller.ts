import { Request, Response } from 'express';
// import * as qs from 'qs';

import DigitalIdentityManager from './digitalIdentity.manager';

class DigitalIdentityController {
    static digitalIdentityManager: DigitalIdentityManager = new DigitalIdentityManager();

    static async getByRoleId(_req: Request, res: Response) {
        const foundRole = await DigitalIdentityManager.findByRoleId(_req.params.roleId);
        res.status(200).send(foundRole);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const foundRole = await DigitalIdentityManager.findByUniqueId(_req.params.uniqueId);
        res.status(200).send(foundRole);
    }
}

export default DigitalIdentityController;
