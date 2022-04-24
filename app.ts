"use strict";
import cookieParser from 'cookie-parser';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import {VisitorsRoutes} from './visitors/vistiors.routes.config';
import debug from 'debug';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

app.use(cookieParser('myCookieSecret'));

app.use(cors());

routes.push(new VisitorsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;

server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});
