"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapController = exports.wrapValidator = exports.wrapMiddleware = void 0;
const wrapMiddleware = (func) => {
    return (req, res, next) => {
        func(req, res)
            .then(() => next())
            .catch(next);
    };
};
exports.wrapMiddleware = wrapMiddleware;
exports.wrapValidator = exports.wrapMiddleware;
const wrapController = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.wrapController = wrapController;
//# sourceMappingURL=index.js.map