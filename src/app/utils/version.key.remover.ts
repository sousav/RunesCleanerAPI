import {NextFunction, Request, Response} from "express";

export class VersionKeyRemover {

    static handler(req: Request, res: Response, next: NextFunction) {
        delete req.body.__v;
        next();
    }

}
