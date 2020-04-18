import {Document, model, Schema} from "mongoose";

export const RuneSchema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export interface IRune extends Document {
    name: string;
}

const Runes = model<IRune>("Rune", RuneSchema);
export default Runes;
