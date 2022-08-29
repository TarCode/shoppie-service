import { IUser } from '../interfaces/user.interface'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../constants/shoppie.constants'
import { Post, Route, Body } from 'tsoa'

@Route('/user')
export class UserService {
  @Post('/register')
  public async register(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<IUser | { error: string }> {
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

    const userWithToken = {
      email: user.email,
      token,
    } as IUser

    return userWithToken
  }

  @Post('/login')
  public async login(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<IUser | { error: string }> {
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: '2h',
      })

      const userWithToken = {
        email: user.email,
        token,
      } as IUser

      return userWithToken
    }
    return { error: 'Invalid credentials' }
  }
}
