#!/usr/bin/env node
import {App} from "./app/app";
import * as http from "http";
import {Server} from "http";
import {Application} from "express";
import {AddressInfo} from "net";

class Index {

    private readonly app: Application;
    private readonly port: any;
    private server: Server;

    constructor() {
        this.app = new App().app;

        this.port = Index.normalizePort(process.env.PORT || '3000');
        this.app.set('port', this.port);

        this.server = http.createServer(this.app);
        this.server.on('error', (error: any) => {
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = (typeof this.port === 'string' ? 'Pipe ' : 'Port ') + this.port;
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
        this.server.on('listening', () => {
            const addr: AddressInfo | string | null = this.server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr as AddressInfo).port;
            console.log('Listening on ' + bind);
        });
    }

    private static normalizePort(val: any) {
        const portNumber = parseInt(val, 10);
        if (isNaN(portNumber)) {
            return val;
        }
        if (portNumber >= 0) {
            return portNumber;
        }
        return false;
    }

    public run() {
        this.server.listen(this.port);
    }

}

new Index().run();
