import {Router} from "express";
import {RunesRouter} from "./runes.router";
import {ApiError} from "../utils/api.error";
import {VersionKeyRemover} from "../utils/version.key.remover";

export class ApiRouter {

    private readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.use(VersionKeyRemover.handler);

        this.router.use("/runes", new RunesRouter().get());

        this.router.use(ApiError.handler);
    }

    public get(): Router {
        return this.router;
    }
}
