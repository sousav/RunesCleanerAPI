import { Request, Response } from "express";
import passport from "passport";
import { PreProcessor } from "typescript-rest";

import { IUser } from "../model/users.model";
import { ApiError } from "../utils/api.error";

export class Auth {

    // tslint:disable-next-line:no-any
    public static Required(): any {
        return PreProcessor(Auth._required);
    }

    private static _required(req: Request, res: Response): void {
        passport.authenticate("jwt", {session: false}, (err: Error, user: IUser): void => {
            if (err || !user) {
                ApiError.Forbidden();
            }
        })(req, res);
    }

}
