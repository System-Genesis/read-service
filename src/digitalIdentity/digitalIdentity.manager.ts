import DigitalIdentityRepository from './digitalIdentity.repository';
import RoleRepository from '../role/role.repository';
import * as ApiErrors from '../core/ApiErrors';

class DigitalIdentityManager {
    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static roleRepository: RoleRepository = new RoleRepository();

    static async findByRoleId(roleId: string) {
        const foundRole = await DigitalIdentityManager.roleRepository.findByRoleId(roleId);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        const { digitalIdentityUniqueId } = foundRole;
        const foundDI = await DigitalIdentityManager.digitalIdentityRepository.findByUniqueId(digitalIdentityUniqueId);
        if (!foundDI) {
            throw new ApiErrors.NotFoundError();
        }
        return foundDI;
    }

    static async findByUniqueId(uniqueId: string) {
        const foundEntity = await DigitalIdentityManager.digitalIdentityRepository.findByUniqueId(uniqueId);
        return foundEntity;
    }
}
export default DigitalIdentityManager;
