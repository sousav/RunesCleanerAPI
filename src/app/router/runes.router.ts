import {RunesController} from "../controller/runes.controller";
import {RestRouter} from "./rest.router";

export class RunesRouter extends RestRouter<RunesController> {

    constructor() {
        const controller = new RunesController();
        super(controller);
    }

}

