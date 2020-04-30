import express, {NextFunction, Request, Response} from "express";
import {ApiRouter} from "./router/api.router";
import {MongoConnection} from "./database/mongo.connection";
import passport from "passport";
import PassportJwt from "passport-jwt";
import Users from "./model/users.model";

export class App {
    public app: express.Application;
    private database: MongoConnection;

    constructor() {
        this.database = new MongoConnection(process.env.DB_HOST);
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT, OPTIONS');
            next();
        });

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.method === 'OPTIONS') {
                res.status(204).send('');
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
                algorithms: ['HS256'],
            },
            async (payload, done) => {
                const user = await Users.findById(payload.sub);
                done(null, user ? user : false)
            }
            )
        )
    }

    private routes() {
        this.app.use("/api", new ApiRouter().get());

        this.app.use((req: Request, res: Response) => {
            res.status(404);
            res.send({error: 'no corresponding request found'});
        });
    }
}

export default new App().app;