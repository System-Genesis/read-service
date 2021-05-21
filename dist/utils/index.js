"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trycatch = exports.promisePipe = void 0;
const stream_1 = require("stream");
const util_1 = require("util");
exports.promisePipe = util_1.promisify(stream_1.pipeline);
const trycatch = async (func, ...args) => {
    try {
        return { result: (await func(...args)) };
    }
    catch (err) {
        return { err };
    }
};
exports.trycatch = trycatch;
//# sourceMappingURL=index.js.map