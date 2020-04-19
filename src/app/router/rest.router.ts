import {Router} from "express";
import {RestController} from "../controller/rest.controller";
import {Document} from "mongoose";
import {AuthMiddleware} from "../middleware/auth.middleware";

export class RestRouter<T extends RestController<Document>> {

    protected readonly router: Router = Router();

    constructor(protected readonly controller: T) {
        this.route()
    }

    public get(): Router {
        return this.router;
    }

    protected route() {
        this.router.get("/", this.controller.gets.bind(this.controller));
        this.router.get("/:id", this.controller.get.bind(this.controller));
        this.router.post("/", AuthMiddleware.required, this.controller.post.bind(this.controller));
        this.router.put("/:id", AuthMiddleware.required, this.controller.put.bind(this.controller));
        this.router.delete("/:id", AuthMiddleware.required, this.controller.delete.bind(this.controller));
    }
}
