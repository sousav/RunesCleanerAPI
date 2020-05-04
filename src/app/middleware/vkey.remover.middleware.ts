import { NextFunction, Request, Response } from "express";

export class VKeyRemoverMiddleware {

    public static handler(req: Request, res: Response, next: NextFunction): void {
        delete req.body.__v;
        next();
    }

}
