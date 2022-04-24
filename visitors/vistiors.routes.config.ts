import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import VisitorsController from './controllers/visitors.controller';
import visitorsMiddleware from './middleware/visitors.middleware';

export class VisitorsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'VisitorsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/`)
            .get(
                visitorsMiddleware.validateVisitorExistance,
                VisitorsController.createVisitor,
                visitorsMiddleware.addCookieToResponseAndSend
            );

        this.app
            .route(`/visitors`)
            .get(VisitorsController.listVisitors);

        return this.app;
    }
}