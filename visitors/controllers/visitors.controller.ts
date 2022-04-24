import express from 'express';
import debug from 'debug';
import visitorsService from '../services/visitors.service';

const log: debug.IDebugger = debug('app:visitors-controller');

class VisitorsController {
    async listVisitors(req: express.Request, res: express.Response) {
        const visitors = await visitorsService.list();
        res.status(200).send(visitors);
    }

    async createVisitor(req: express.Request, res: express.Response,  next: express.NextFunction) {
        res.locals.user = await visitorsService.create();
        next();
    }

    async put(req: express.Request, res: express.Response) {
        res.status(204).send();
    }
}

export default new VisitorsController();