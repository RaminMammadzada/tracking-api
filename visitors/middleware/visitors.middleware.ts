import express from 'express';
import visitorsService from '../services/visitors.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:visitors-middleware');
class UsersMiddleware {
    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fileds email and password`,
            });
        }
    }

    async updateUserVisitInformationIfExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        console.log("req.cookies.user::: ", req.cookies.user);
        await visitorsService.putByUnequeId(req.cookies.user.unequeId, req.cookies.user)
        next();
    }

    async validateVisitorExistance(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (!req.cookies.user) {
            next();
        } else {
            await visitorsService.putByUnequeId(req.cookies.user.unequeId, req.cookies.user);
            res.status(201).send(`Welcome old visitor, the time you visit the page: ${req.cookies.user.numberOfVisit}`);
        }
    }

    async addCookieToResponseAndSend(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (res.locals.user.id) {
            const userId = res.locals.user.id;
            const visitor = await visitorsService.readById(userId)
            res.cookie("user", visitor);
            res.status(200).send("Welcome to our page. This is your first time visiting here!");
        }
        next();
    }
}

export default new UsersMiddleware();