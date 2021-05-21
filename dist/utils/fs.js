"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const events_1 = require("events");
const fsCreateReadStream = async (path, options) => {
    const fileReadStream = fs.createReadStream(path, options);
    await events_1.once(fileReadStream, 'ready');
    return fileReadStream;
};
exports.default = fsCreateReadStream;
//# sourceMappingURL=fs.js.map