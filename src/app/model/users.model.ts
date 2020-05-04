import { Document, model, PassportLocalModel, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export const userSchema: Schema = new Schema(
    {
        email: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    usernameLowerCase: true,
    session: false
});

export interface IUser extends Document {
    email: string;
}

export const Users: PassportLocalModel<IUser> = model<IUser>("Users", userSchema) as PassportLocalModel<IUser>;
