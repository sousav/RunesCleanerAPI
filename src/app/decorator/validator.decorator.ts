import { Request, Response } from "express";
import { Result, ValidationChain, ValidationError, validationResult } from "express-validator";
import HttpStatus from "http-status-codes";
import { PreProcessor } from "typescript-rest";

import { ApiError } from "../utils/api.error";

// tslint:disable-next-line:no-any
export const Validate: (chains: ValidationChain[]) => any = (chains: ValidationChain[]): any => {
    const validator: RequestValidator = RequestValidator.for(chains);

    return PreProcessor(validator.handler.bind(validator));
};

class RequestValidator {

    private readonly chains: ValidationChain[];

    private constructor(chains: ValidationChain[]) {
        this.chains = chains;
    }

    public async handler(req: Request, res: Response): Promise<void> {
        // tslint:disable-next-line:no-any
        await Promise.all(this.chains.map((chain: ValidationChain): Promise<any> => chain.run(req)));
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ApiError(HttpStatus.BAD_REQUEST, errors.array({onlyFirstError: true}));
        }
    }

    public static for(chains: ValidationChain[]): RequestValidator {
        return new RequestValidator(chains);
    }
}
