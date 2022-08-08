import { IItem } from "../interfaces/item.interface";
import { Item } from "../models/item.model";
import { WELCOME_MESSAGE } from "../constants/shoppie.constants";
import { ObjectId } from "mongoose";

export class ItemService {
  public welcomeMessage(): string {
    return WELCOME_MESSAGE;
  }

  public findAll(): Promise<IItem[]> {
    return Item.find({}).exec();
  }

  public findByListId(listId: string): Promise<IItem[]> {
    return Item.find({ listId }).exec();
  }

  public add(item: IItem): Promise<IItem> {
    const newItem = new Item(item);
    return newItem.save();
  }

  public async delete(id: string) {
    const deletedItem: (IItem & { _id: ObjectId; }) | null = await Item.findByIdAndDelete(
      id
    ).exec();

    if (!deletedItem) {
      throw new Error(`Item with id '${id}' not found`);
    }

    return deletedItem;
  }

  // Our new update method
  public async update(id: string, item: IItem) {
    const updatedItem: (IItem & { _id: ObjectId; }) | null = await Item.findByIdAndUpdate(
      id,
      item
    ).exec();

    if (!updatedItem) {
      throw new Error(`Item with id '${id}' not found`);
    }

    return updatedItem;
  }
}