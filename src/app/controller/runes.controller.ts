import {Request, Response} from "express";
import Runes from "../model/runes.model";
import {safeThrow} from "../../decorators/safethrow";
import {ApiError} from "../utils/api.error";

export class RunesController {

    @safeThrow
    public async gets(req: Request, res: Response) {
        const runes = await Runes.find();
        res.status(200).json(runes);
    }

    @safeThrow
    public async get(req: Request, res: Response) {
        const rune = await Runes.findOne({_id: req.params.id});
        if (!rune) {
            ApiError.ItemNotFound();
        }
        res.status(200).json(rune);
    }

    @safeThrow
    public async post(req: Request, res: Response) {
        const rune = new Runes({
            name: req.body.name
        });

        await rune.save();
        res.status(201).json(rune as any);
    }

    @safeThrow
    public async put(req: Request, res: Response) {
        const rune = await Runes.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
        if (!rune) {
            ApiError.ItemNotFound()
        }
        res.status(202).json(rune);
    }

    @safeThrow
    public async delete(req: Request, res: Response) {
        const rune = await Runes.deleteOne({_id: req.params.id});
        if (!rune) {
            ApiError.ItemNotFound()
        }
        res.status(204).end();
    }

}
