import e, { Application, json, NextFunction, Request, Response, Router, urlencoded } from "express";
import HttpStatus from "http-status-codes";
import passport from "passport";
import PassportJwt, { VerifiedCallback } from "passport-jwt";
import { Server } from "typescript-rest";

import { AuthController } from "./controller/auth.controller";
import { PlaceholdersController } from "./controller/placeholder.controller";
import { MongoConnection } from "./database/mongo.connection";
import { ApiErrorMiddleware } from "./middleware/api.error.middleware";
import { VKeyRemoverMiddleware } from "./middleware/vkey.remover.middleware";
import { IUser, Users } from "./model/users.model";

export class App {
    public readonly app: Application;
    private readonly database: MongoConnection;

    public constructor() {
        this.database = new MongoConnection(process.env.DB_HOST!);
        this.app = e();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.disable("x-powered-by");
        this.app.use(json());
        this.app.use(urlencoded({extended: false}));

        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH, PUT, OPTIONS");
            next();
        });

        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            if (req.method === "OPTIONS") {
                res.status(HttpStatus.NO_CONTENT).send("");
            } else {
                next();
            }
        });

        passport.use(Users.createStrategy());
        passport.serializeUser(Users.serializeUser());
        passport.deserializeUser(Users.deserializeUser());
        passport.use(
            new PassportJwt.Strategy({
                    jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: process.env.JWT_SECRET,
                    algorithms: ["HS256"]
                },
                // tslint:disable-next-line:no-any
                async (payload: any, done: VerifiedCallback): Promise<void> => {
                    const user: IUser | undefined = await Users.findById(payload.sub);
                    done(undefined, user ? user : false);
                }
            )
        );
    }

    private routes(): void {
        const api: Router = Router();

        api.use(VKeyRemoverMiddleware.handler);
        Server.buildServices(api, AuthController, PlaceholdersController);
        api.use(ApiErrorMiddleware.handler);

        this.app.use("/api", api);
    }
}

export const app: Application = new App().app;
