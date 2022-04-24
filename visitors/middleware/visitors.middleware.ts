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

    async validateVisitorNotExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // here is the point we need to add logic
        console.log("MA COOKIES: ", req.cookies.userId);

        if (!req.cookies.userId) {
            // create new user
            // create new cookie and add it to res
            next();
        } else {
            // update the old users visiting number
            // continue to welcome old user
            res.status(201).send(`Welcome old visitor`);
        }

        // const visitor = await visitorsService.readById(req.params.userId);
        // if (!visitor) {
        //     next();
        // } else {
        //     res.status(404).send({
        //         error: `User ${req.params.userId} not found`,
        //     });
        // }
    }

    async addCookieToResponseAndSend(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // create cookie and add it to reponse
        // send response
        if (res.locals.user.id) {
            const userId = res.locals.user.id;
            const visitor = visitorsService.readById(userId)
            res.cookie("userId", visitor);
            res.status(200).send("Welcome to our page. This is your first time visiting here!");
        }
        res.status(401).send();
    }
}

export default new UsersMiddleware();