import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { DELETE, GET, Path, POST, PUT, Return } from "typescript-rest";

import { Auth } from "../decorator/auth.decorator";
import { ApiError } from "../utils/api.error";

import { BaseController } from "./base.controller";

export class RestController<T extends Document> extends BaseController {

    protected collection: Model<T>;

    public constructor(collection: Model<T>) {
        super();

        this.collection = collection;
    }

    @GET
    @Path(":id")
    public async get(): Promise<T> {
        const item: T = await this.collection.findOne(
            {_id: this.request.params.id} as FilterQuery<T>
        );
        if (!item) {
            ApiError.ItemNotFound();
        }

        return item!;
    }

    @GET
    public async gets(): Promise<T[]> {
        return this.collection.find();
    }

    @POST
    @Auth.Required()
    public async post(body: T): Promise<Return.NewResource<T>> {
        const item: T = new this.collection(body);
        await item.save();

        return new Return.NewResource<T>(`${this.request.url}/${item._id}`, item);
    }

    @PUT
    @Path(":id")
    @Auth.Required()
    public async put(body: object): Promise<Return.RequestAccepted<T>> {
        const item: T = await this.collection.findOneAndUpdate(
            {_id: this.request.params.id} as FilterQuery<T>,
            {$set: body} as UpdateQuery<T>,
            {new: true}
        );
        if (!item) {
            ApiError.ItemNotFound();
        }

        return new Return.RequestAccepted<T>(`${this.request.url}/${item!._id}`, item);
    }

    @DELETE
    @Path(":id")
    @Auth.Required()
    public async delete(): Promise<void> {
        const item: { deletedCount?: number } = await this.collection.deleteOne({
            _id: this.request.params.id
        } as FilterQuery<T>);
        if (item.deletedCount === 0) {
            ApiError.ItemNotFound();
        }
    }

}
