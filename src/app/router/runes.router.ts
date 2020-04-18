import {Router} from "express";
import {RunesController} from "../controller/runes.controller";

export class RunesRouter {

    private readonly router: Router;
    private readonly controller: RunesController = new RunesController();

    constructor() {
        this.router = Router();

        this.router.get("/", this.controller.gets);
        this.router.post("/", this.controller.post);
        this.router.get("/:id", this.controller.get);
        this.router.put("/:id", this.controller.put);
        this.router.delete("/:id", this.controller.delete);
    }

    public get(): Router {
        return this.router;
    }
}
