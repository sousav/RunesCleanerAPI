import {NextFunction, Request, Response} from "express";
import {ApiError} from "../utils/api.error";

export class ApiErrorMiddleware {

    static handler(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === ApiError.name) {
            const apiErr: ApiError = err as unknown as ApiError;
            return res.status(apiErr.status).json({error: apiErr.message});
        }
        res.status(500).json({error: err.message});
        next(err);
    }

}
