import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

import { ApiError } from "../utils/api.error";

export class ApiErrorMiddleware {

    public static handler(err: Error, req: Request, res: Response, next: NextFunction): void {
        if (err.name === ApiError.name) {
            const apiErr: ApiError = err as ApiError;
            res.status(apiErr.status).json({error: apiErr.message});

            return;
        }
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: err.message});
        next(err);
    }

}
