import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../constants/shoppie.constants'

export class UserService {
  public async register(email: string, password: string): Promise<IUser | { error: string }> {
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return { error: 'User already exists. Please Login' }
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    })

    const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
      expiresIn: '2h',
    })

    user.token = token
    return user
  }

  public async login(email: string, password: string): Promise<IUser | { error: string }> {
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: '2h',
      })

      user.token = token

      return user
    }
    return { error: 'Invalid credentials' }
  }
}
