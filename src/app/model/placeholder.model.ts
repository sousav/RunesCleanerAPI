import { Document, Model, model, Schema } from "mongoose";

export const PlaceholderSchema: Schema = new Schema(
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

export const Placeholders: Model<IPlaceholder> = model<IPlaceholder>("Placeholder", PlaceholderSchema);
