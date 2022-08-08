import { IItem } from "../interfaces/item.interface";
import { model, Schema } from "mongoose";

const ItemSchema = new Schema({
  name: { type: String, required: [true, "Field is required"] },
  listId: { type: String, required: [true, "Field is required"] },
}, { timestamps: true });

export const Item = model<IItem>("Item", ItemSchema);