import Runes, {IRune} from "../model/runes.model";
import {RestController} from "./rest.controller";

export class RunesController extends RestController<IRune> {

    constructor() {
        super(Runes);
    }

}
