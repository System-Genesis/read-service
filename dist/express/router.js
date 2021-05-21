"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = require("./feature/router");
const appRouter = express_1.Router();
appRouter.use('/api', router_1.default);
appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});
appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});
exports.default = appRouter;
//# sourceMappingURL=router.js.map