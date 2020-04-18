import {NextFunction, Request, Response} from "express";

export class ApiError implements Error {

    constructor(public status: number, public message: string, public name: string = undefined) {
        if (!this.name) {
            this.name = this.constructor.name
        }
    }

    static handler(err: Error, req: Request, res: Response, next: NextFunction) {
        if (err.name === ApiError.name) {
            const apiErr: ApiError = err as unknown as ApiError;
            return res.status(apiErr.status).json({error: apiErr.message});
        }
        res.status(500).json({error: err.message});
        next(err);
    }

    static ItemNotFound() {
        throw new ApiError(404, "No resource found that matches the given id.")
    }

}
