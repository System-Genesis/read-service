"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const events_1 = require("events");
const error_1 = require("./error");
const router_1 = require("./router");
class Server {
    constructor(port) {
        this.app = Server.createExpressApp();
        this.port = port;
    }
    static createExpressApp() {
        const app = express();
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(logger('dev'));
        app.use(router_1.default);
        app.use(error_1.errorMiddleware);
        return app;
    }
    async start() {
        this.http = this.app.listen(this.port);
        await events_1.once(this.http, 'listening');
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map