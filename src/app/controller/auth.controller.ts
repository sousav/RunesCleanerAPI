import { check } from "express-validator";
import HttpStatus from "http-status-codes";
import JWT from "jsonwebtoken";
import { AuthenticationResult } from "mongoose";
import { Path, POST, PreProcessor } from "typescript-rest";

import { Validate, } from "../decorator/validator.decorator";
import { ILoginForm } from "../form/login.form";
import { IRegisterForm } from "../form/register.form";
import { IUser, Users } from "../model/users.model";
import { ApiError } from "../utils/api.error";

import { BaseController } from "./base.controller";

@Path("auth")
export class AuthController extends BaseController {

    @POST
    @Path("login")
    @Validate([
        check("email", "field 'email' is required.").not().isEmpty(),
        check("email", "field 'email' is not a valid email.").isEmail(),
        check("password", "field 'password' is required.").not().isEmpty(),
        check("password", "field 'password' must be at least 5 char long.").isLength({min: 5})
    ])
    public async login(body: ILoginForm): Promise<object> {
        const user: IUser | undefined = await Users.findOne({email: body.email});
        if (!user) {
            throw new ApiError(HttpStatus.NOT_FOUND, "No account found that matches the given email.");
        }
        const result: AuthenticationResult = await Users.authenticate()(body.email, body.password);
        if (result.error) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, result.error);
        }
        this.request.user = user;

        return this.signJWT();
    }

    @POST
    @Path("register")
    @Validate([
        check("email", "field 'email' is required.").not().isEmpty(),
        check("email", "field 'email' is not a valid email.").isEmail(),
        check("password", "field 'password' is required.").not().isEmpty(),
        check("password", "field 'password' must be at least 5 char long.").isLength({min: 5})
    ])
    public async register(body: IRegisterForm): Promise<object> {
        if (await Users.findOne({email: body.email})) {
            throw new ApiError(HttpStatus.CONFLICT, "An account using this email is already registered.");
        }

        await Users.register({
            email: body.email
        } as IUser, body.password);

        this.request.user = await Users.findOne({email: body.email});

        return this.signJWT();
    }

    private signJWT(): object {
        const user: IUser = this.request.user as IUser;

        const token: string = JWT.sign({
            email: user.email
        }, process.env.JWT_SECRET!, {
            algorithm: "HS256",
            expiresIn: "7 days",
            subject: user._id.toString()
        });

        return {user, token};
    }

}
