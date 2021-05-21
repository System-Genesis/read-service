"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const validator_1 = require("./validator");
const express_2 = require("../../utils/express");
const joi_1 = require("../../utils/joi");
const validator_schema_1 = require("./validator.schema");
const featureRouter = express_1.Router();
featureRouter.get('/folders', joi_1.default(validator_schema_1.getFoldersRequestSchema), express_2.wrapController(controller_1.default.getFolders));
featureRouter.post('/folders', joi_1.default(validator_schema_1.createFolderRequestSchema), express_2.wrapController(controller_1.default.createFolder));
featureRouter.get('/folders/hardToValidateWithSchema', express_2.wrapValidator(validator_1.default.somethingThatIsImpossibleToValidateWithSchema));
exports.default = featureRouter;
//# sourceMappingURL=router.js.map