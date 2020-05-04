#!/usr/bin/env node
import { Application } from "express";
import http, { Server } from "http";

import { App } from "./app/app";

class Index {
    private readonly app: Application;
    private readonly port: number;
    private readonly server: Server;

    public constructor() {
        this.app = new App().app;

        this.port = Number(process.env.PORT || "3000");
        this.app.set("port", this.port);

        this.server = http.createServer(this.app);
        // tslint:disable-next-line:no-any
        this.server.on("error", (error: any): void => {
            if (error.syscall !== "listen") {
                throw error;
            }

            const bind: string = String(`Port ${this.port}`);
            switch (error.code) {
                case "EACCES":
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                case "ERR_ASSERTION":
                    break;
                default:
                    throw error;
            }
        });
        this.server.on("listening", (): void => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    public run(): void {
        this.server.listen(this.port);
    }

}

new Index().run();
