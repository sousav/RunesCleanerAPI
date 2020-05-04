import { Path } from "typescript-rest";

import { IPlaceholder, Placeholders } from "../model/placeholder.model";

import { RestController } from "./rest.controller";

@Path("placeholders")
export class PlaceholdersController extends RestController<IPlaceholder> {

    public constructor() {
        super(Placeholders);
    }

}
