import express from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {ApiRouter} from "./router/api.router";
import path from "path";
import {MongoConnection} from "./database/mongo.connection";

export class App {
    public app: express.Application;
    private readonly database: MongoConnection = new MongoConnection('mongodb://localhost:27017/runescleaner');

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        this.app.use(express.static(path.join(__dirname, 'public')));

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
    }

    private routes() {
        this.app.use("/api", new ApiRouter().get());

        this.app.use((req: Request, res: Response) => {
            res.status(404);
            res.send({error: 'no corresponding request found'});
        });
    }
}
