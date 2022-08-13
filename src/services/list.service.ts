import { IList } from '../interfaces/list.interface'
import { List } from '../models/list.model'
import { ObjectId } from 'mongoose'

export class ListService {
  public findByUserId(userId: string): Promise<IList[]> {
    return List.find({ userId }).exec()
  }

  public findById(id: string): Promise<IList | null> {
    return List.findById(id).exec()
  }

  public add(list: IList): Promise<IList> {
    const newList = new List(list)
    return newList.save()
  }

  public async delete(id: string) {
    const deletedList: (IList & { _id: ObjectId }) | null = await List.findByIdAndDelete(id).exec()

    if (!deletedList) {
      throw new Error(`List with id '${id}' not found`)
    }

    return deletedList
  }

  // Our new update method
  public async update(id: string, list: IList) {
    const updatedList: (IList & { _id: ObjectId }) | null = await List.findByIdAndUpdate(id, list).exec()

    if (!updatedList) {
      throw new Error(`List with id '${id}' not found`)
    }

    return updatedList
  }
}
