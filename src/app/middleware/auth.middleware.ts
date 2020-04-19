import passport from "passport";
import {NextFunction, Request, Response} from "express";
import {safethrow} from "../utils/safethrow.decorator";
import {ApiError} from "../utils/api.error";

export class AuthMiddleware {

    @safethrow
    public static async required(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err || !user) {
                ApiError.Forbidden()
            }
            return next();
        })(req, res, next);
    }

}
