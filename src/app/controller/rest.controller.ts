import {Request, Response} from "express";
import {safethrow} from "../utils/safethrow.decorator";
import {ApiError} from "../utils/api.error";
import {Document, FilterQuery, Model, UpdateQuery} from "mongoose";

export class RestController<T extends Document> {

    constructor(protected collection: Model<T>) {
    }

    @safethrow
    public async gets(req: Request, res: Response) {
        const items = await this.collection.find();
        res.status(200).json(items);
    }

    @safethrow
    public async get(req: Request, res: Response) {
        const item = await this.collection.findOne(
            {_id: req.params.id} as FilterQuery<T>
        );
        if (!item) {
            ApiError.ItemNotFound();
        }
        res.status(200).json(item);
    }

    @safethrow
    public async post(req: Request, res: Response) {
        const item = new this.collection(req.body);
        await item.save();
        res.status(201).json(item as any);
    }

    @safethrow
    public async put(req: Request, res: Response) {
        const item = await this.collection.findOneAndUpdate(
            {_id: req.params.id} as FilterQuery<T>,
            {$set: req.body} as UpdateQuery<T>,
            {new: true}
        );
        if (!item) {
            ApiError.ItemNotFound()
        }
        res.status(202).json(item);
    }

    @safethrow
    public async delete(req: Request, res: Response) {
        const item = await this.collection.deleteOne({_id: req.params.id} as FilterQuery<T>);
        if (!item || !item.deletedCount) {
            ApiError.ItemNotFound()
        }
        res.status(204).end();
    }

}
