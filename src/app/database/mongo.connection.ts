import {connect} from "mongoose";

export class MongoConnection {

    constructor(private uri: string) {
        connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(_ => console.log("Database connection opened."));
    }


}
