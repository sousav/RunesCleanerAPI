import {Document, model, Schema} from "mongoose";

export const PlaceholderSchema = new Schema(
    {
        name: {type: String, required: true}
    },
    {
        timestamps: true
    }
);

export interface IPlaceholder extends Document {
    name: string;
}

const Placeholders = model<IPlaceholder>("Placeholder", PlaceholderSchema);
export default Placeholders;

