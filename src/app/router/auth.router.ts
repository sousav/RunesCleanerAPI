import {Router} from "express";
import {AuthController} from "../controller/auth.controller";

export class AuthRouter {
    private readonly router: Router = Router();
    private readonly controller: AuthController = new AuthController();

    constructor() {
        this.route();
    }

    public get(): Router {
        return this.router;
    }

    private route() {
        this.router.post("/register",
            ...AuthController.validator.register,
            this.controller.register.bind(this.controller),
            this.controller.signJWT.bind(this.controller)
        );
        this.router.post("/login",
            ...AuthController.validator.login,
            this.controller.login.bind(this.controller),
            this.controller.signJWT.bind(this.controller)
        );
    }
}

