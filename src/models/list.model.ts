import { IList } from '../interfaces/list.interface'
import { model, Schema } from 'mongoose'

const ListSchema = new Schema(
  {
    name: { type: String, required: [true, 'Field is required'] },
    userId: { type: String, required: [true, 'Field is required'] },
  },
  { timestamps: true },
)

export const List = model<IList>('List', ListSchema)
