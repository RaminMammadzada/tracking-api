"use strict";
// import cookieParser from 'cookie-parser';

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

app.use(cors());

routes.push(new VisitorsRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
// app.get('/', (req: express.Request, res: express.Response) => {
//     res.status(200).send(runningMessage)
// });


server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to know when the server is done starting up
    console.log(runningMessage);
});








// const router = express.Router();

// // app.use(cors("*"));

// app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
// });

// app.use(logger('dev'));
// app.use(cookieParser());

// const indexRouter = router.get('/', function(req, res, next) {
//     console.log(req);
//     console.log("ramin");
// });

// app.use('/', indexRouter);

// const PORT = 3300;
// app.listen(PORT, () => {
//     console.log(`[server]: Server is running at https://localhost:${PORT}`);
// });