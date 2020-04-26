import {connect} from "mongoose";

export class MongoConnection {

    constructor(private uri: string) {
        connect(this.uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(undefined, /* istanbul ignore next */ _ => {
            console.error("Database connection failed.")
        });
    }


}
