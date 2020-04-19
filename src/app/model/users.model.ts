import {Document, model, PassportLocalModel, Schema} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

export const UserSchema = new Schema(
    {
        email: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameLowerCase: true,
    session: false
});

export interface IUser extends Document {
    email: string;
}

const Users = model<IUser>("Users", UserSchema) as PassportLocalModel<IUser>;

export default Users;
