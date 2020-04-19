import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {ApiError} from "../utils/api.error";

export class ValidatorMiddleware {

    public static handler(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(400, errors.array({onlyFirstError: true}));
        }
        next()
    }
}
