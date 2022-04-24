import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:visitors-controller');

class VisitorsController {
    async listVisitors(req: express.Request, res: express.Response) {
        res.status(200).send([]);
    }

    async createVisitor(req: express.Request, res: express.Response) {
        const visitorId = 123;
        res.status(201).send(`Welcome to the page. This is your first time visiting here. This id assigned to you: ${visitorId}`);
    }

    async put(req: express.Request, res: express.Response) {
        res.status(204).send();
    }
}

export default new VisitorsController();