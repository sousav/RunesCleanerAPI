"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_router_1 = require("./router/api.router");
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    App.prototype.config = function () {
        this.app.disable('x-powered-by');
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT, OPTIONS');
            next();
        });
        this.app.use(function (req, res, next) {
            if (req.method === 'OPTIONS') {
                res.status(204).send('');
            }
            else {
                next();
            }
        });
    };
    App.prototype.routes = function () {
        this.app.use("/api", new api_router_1.ApiRouter().get());
        this.app.use(function (req, res) {
            res.status(404);
            res.send({ error: 'no corresponding request found' });
        });
    };
    return App;
}());
exports.App = App;
