import * as fs from 'fs';
import * as http from 'http';
import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as compression from 'compression';

import { once } from 'events';
import errorMiddleware from '../core/errorController';
import appRouter from './router';

class Server {
    public app: express.Application;

    private http: http.Server;

    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
    }

    static createExpressApp() {
        const app = express();

        app.use(helmet());
        // TODO (M) : the 2 following are default?
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(compression());
        app.use(
            logger('dev', {
                stream: fs.createWriteStream('./access.log', { flags: 'w' }),
            }),
        );
        app.use(logger('dev'));

        app.use(appRouter);

        app.use(errorMiddleware);

        return app;
    }

    async start() {
        this.http = this.app.listen(this.port);
        await once(this.http, 'listening');
    }

    async stop() {
        this.http.close();
    }
}

export default Server;
