"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunesController = /** @class */ (function () {
    function RunesController() {
    }
    RunesController.prototype.get = function (req, res) {
        res.json({
            message: "Hello boi"
        });
    };
    return RunesController;
}());
exports.RunesController = RunesController;
