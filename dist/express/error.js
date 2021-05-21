"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ServiceError = void 0;
class ServiceError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.ServiceError = ServiceError;
const errorMiddleware = (error, _req, res, next) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: error.name,
            message: error.message,
        });
    }
    else if (error instanceof ServiceError) {
        res.status(error.code).send({
            type: error.name,
            message: error.message,
        });
    }
    else {
        res.status(500).send({
            type: error.name,
            message: error.message,
        });
    }
    next();
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map