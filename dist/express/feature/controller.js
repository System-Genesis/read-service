"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("./manager");
class FeatureController {
    static async getFolders(req, res) {
        res.json(await manager_1.FeatureManager.getFolders(req.query));
    }
    static async createFolder(req, res) {
        res.json(await manager_1.FeatureManager.createFolder(req.body));
    }
}
exports.default = FeatureController;
//# sourceMappingURL=controller.js.map