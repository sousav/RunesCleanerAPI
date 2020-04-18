"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var runes_controller_1 = require("../controller/runes.controller");
var RunesRouter = /** @class */ (function () {
    function RunesRouter() {
        this.controller = new runes_controller_1.RunesController();
        this.router = express_1.Router();
        this.router.use("/", this.controller.get);
    }
    RunesRouter.prototype.get = function () {
        return this.router;
    };
    return RunesRouter;
}());
exports.RunesRouter = RunesRouter;
