import { connect } from "mongoose";

export class MongoConnection {

    public constructor(uri: string) {
        connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(undefined, /* istanbul ignore next */ (_: Error): void => {
            console.error("Database connection failed.");
        });
    }

}
