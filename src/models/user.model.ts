import { IUser } from '../interfaces/user.interface'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: [true, 'Field is required'] },
    password: { type: String, required: [true, 'Field is required'] },
  },
  { timestamps: true },
)

export const User = model<IUser>('User', UserSchema)
