import { Request, Response } from 'express';
// import * as qs from 'qs';

import RoleManager from './role.manager';

class RoleController {
    static entityManager: RoleManager = new RoleManager();

    static extractRoleQueries(_req: Request) {
        const { direct, page } = _req.query as { [key: string]: string };
        const pageNum = parseInt(page, 10);
        const isDirect = direct === 'true';
        // const userQueries: optionalQueries = extractFilters(_req.query as any);
        return { isDirect, pageNum };
    }

    static async getByRoleId(_req: Request, res: Response) {
        const foundRole = await RoleManager.findByRoleId(_req.params.roleId);
        res.status(200).send(foundRole);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const foundRole = await RoleManager.findByDigitalIdentity(_req.params.digitalIdentityUniqueId);
        res.status(200).send(foundRole);
    }

    static async getByGroupId(_req: Request, res: Response) {
        const { isDirect, pageNum } = RoleController.extractRoleQueries(_req);
        const foundRoles = await RoleManager.findByGroup(_req.params.groupId, isDirect, pageNum);
        res.status(200).send(foundRoles);
    }
}

export default RoleController;
