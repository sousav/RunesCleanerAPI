import {NextFunction, Request, Response} from "express";
import {safethrow} from "../utils/safethrow.decorator";
import Users, {IUser} from "../model/users.model";
import {ApiError} from "../utils/api.error";
import {check} from "express-validator";
import {ValidatorMiddleware} from "../middleware/validator.middleware";
import JWT from "jsonwebtoken"

export class AuthController {

    public static validator = {
        register: [
            [
                check('email', 'field \'email\' is required.').not().isEmpty(),
                check('email', 'field \'email\' is not a valid email.').isEmail(),
                check('password', 'field \'password\' is required.').not().isEmpty(),
                check('password', 'field \'password\' must be at least 5 char long.').isLength({min: 5})
            ],
            ValidatorMiddleware.handler
        ],
        login: [
            [
                check('email', 'field \'email\' is required.').not().isEmpty(),
                check('email', 'field \'email\' is not a valid email.').isEmail(),
                check('password', 'field \'password\' is required.').not().isEmpty(),
                check('password', 'field \'password\' must be at least 5 char long.').isLength({min: 5})
            ],
            ValidatorMiddleware.handler
        ]
    };

    public signJWT(req: Request, res: Response) {
        const user = req.user as IUser;

        const token = JWT.sign({
            email: user.email
        }, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '7 days',
            subject: user._id.toString()
        });
        res.status(200).json({user, token});
    }


    @safethrow
    public async register(req: Request, res: Response, next: NextFunction) {
        if (await Users.findOne({email: req.body.email})) {
            throw new ApiError(409, "An account using this email is already registered.");
        }

        await Users.register({
            email: req.body.email
        } as IUser, req.body.password);

        req.user = await Users.findOne({email: req.body.email});
        next();
    }

    @safethrow
    public async login(req: Request, res: Response, next: NextFunction) {
        const user = await Users.findOne({email: req.body.email});
        if (!user) {
            throw new ApiError(404, "No account found that matches the given email.")
        }
        const result = await Users.authenticate()(req.body.email, req.body.password);
        if (result.error) {
            throw new ApiError(401, result.error);
        }

        req.user = user;
        next()
    }

}
