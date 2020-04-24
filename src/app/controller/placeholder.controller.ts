import Placeholders, {IPlaceholder} from "../model/placeholder.model";
import {RestController} from "./rest.controller";

export class PlaceholdersController extends RestController<IPlaceholder> {

    constructor() {
        super(Placeholders);
    }

}
