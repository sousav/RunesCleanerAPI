"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var runes_router_1 = require("./runes.router");
var ApiRouter = /** @class */ (function () {
    function ApiRouter() {
        this.router = express_1.Router();
        this.router.use("/runes", new runes_router_1.RunesRouter().get());
    }
    ApiRouter.prototype.get = function () {
        return this.router;
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
