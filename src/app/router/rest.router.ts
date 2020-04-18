import {Router} from "express";
import {RestController} from "../controller/rest.controller";
import {Document} from "mongoose";

export class RestRouter<T extends RestController<Document>> {

    protected readonly router: Router = Router();

    constructor(private readonly controller: T) {
        this.route()
    }

    protected route() {
        this.router.get("/", this.controller.gets.bind(this.controller));
        this.router.post("/", this.controller.post.bind(this.controller));
        this.router.get("/:id", this.controller.get.bind(this.controller));
        this.router.put("/:id", this.controller.put.bind(this.controller));
        this.router.delete("/:id", this.controller.delete.bind(this.controller));
    }

    public get(): Router {
        return this.router;
    }
}
