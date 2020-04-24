import {Router} from "express";
import {PlaceholderRouter} from "./placeholder.router";
import {VKeyRemoverMiddleware} from "../middleware/vkey.remover.middleware";
import {AuthRouter} from "./auth.router";
import {ApiErrorMiddleware} from "../middleware/api.error.middleware";

export class ApiRouter {

    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.use(VKeyRemoverMiddleware.handler);

        this.router.use("/auth", new AuthRouter().get());
        this.router.use("/placeholders", new PlaceholderRouter().get());

        this.router.use(ApiErrorMiddleware.handler);
    }

    public get(): Router {
        return this.router;
    }
}
