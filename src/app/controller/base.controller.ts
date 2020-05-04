import { Request, Response } from "express";
import { ContextRequest, ContextResponse } from "typescript-rest";

export class BaseController {

    @ContextRequest protected request: Request;
    @ContextResponse protected response: Response;

}
