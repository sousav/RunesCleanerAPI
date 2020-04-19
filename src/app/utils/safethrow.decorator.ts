import {NextFunction, Request, Response} from "express";

export function safethrow(
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<(req: Request, res: Response, next: NextFunction) => Promise<any>>) {
    const fun = descriptor.value;
    descriptor.value = async function () {
        try {
            await fun.apply(this, arguments);
        } catch (err) {
            arguments[2](err);
        }
    };
}
