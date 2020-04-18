#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
var http = __importStar(require("http"));
var Index = /** @class */ (function () {
    function Index() {
        var _this = this;
        this.app = new app_1.App().app;
        this.port = Index.normalizePort(process.env.PORT || '3000');
        this.app.set('port', this.port);
        this.server = http.createServer(this.app);
        this.server.on('error', function (error) {
            if (error.syscall !== 'listen') {
                throw error;
            }
            var bind = (typeof _this.port === 'string' ? 'Pipe ' : 'Port ') + _this.port;
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                case "ERR_ASSERTION":
                    break;
                default:
                    throw error;
            }
        });
        this.server.on('listening', function () {
            var addr = _this.server.address();
            var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        });
    }
    Index.normalizePort = function (val) {
        var portNumber = parseInt(val, 10);
        if (isNaN(portNumber)) {
            return val;
        }
        if (portNumber >= 0) {
            return portNumber;
        }
        return false;
    };
    Index.prototype.run = function () {
        this.server.listen(this.port);
    };
    return Index;
}());
new Index().run();
