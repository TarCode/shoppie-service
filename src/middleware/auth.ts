import { Response, NextFunction } from 'express'
import { RequestUser } from '../types/express'
import jwt from 'jsonwebtoken'
import { TOKEN_KEY } from '../constants/shoppie.constants'

export const verifyToken = (req: RequestUser, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY)
    // TODO: Check if decoded user exists in db
    console.log('DECODED TOKEN', decoded)

    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}
