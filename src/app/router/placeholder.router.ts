import {RestRouter} from "./rest.router";
import {PlaceholdersController} from "../controller/placeholder.controller";

export class PlaceholderRouter extends RestRouter<PlaceholdersController> {

    constructor() {
        const controller = new PlaceholdersController();
        super(controller);
    }

}

