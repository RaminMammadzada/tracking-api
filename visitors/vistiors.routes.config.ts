import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import VisitorsController from './controllers/visitors.controller';

export class VisitorsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'VisitorsRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/`)
            .get(VisitorsController.createVisitor);

        this.app
            .route(`/visitors`)
            .get(VisitorsController.listVisitors);

        return this.app;
    }
}