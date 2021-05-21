"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureManager = void 0;
const uuid_1 = require("uuid");
const model_1 = require("./model");
class FeatureManager {
    static getFolders(query) {
        return model_1.default.find(query).exec();
    }
    static createFolder(folder) {
        const newFolder = { ...folder, folderId: uuid_1.v4() };
        return model_1.default.create(newFolder);
    }
}
exports.FeatureManager = FeatureManager;
exports.default = FeatureManager;
//# sourceMappingURL=manager.js.map