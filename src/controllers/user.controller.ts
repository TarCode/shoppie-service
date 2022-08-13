import { Request, Response, Router } from 'express'

import { UserService } from '../services/user.service'
import logger from '../middleware/logger'
import { IUser } from '../interfaces/user.interface'

export class UserController {
  public router = Router()
  private userService = new UserService()

  constructor() {
    this.setRoutes()
  }

  public setRoutes() {
    this.router.route('/register').post(this.register)
    this.router.route('/login').post(this.login)
  }

  private register = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!(email && password)) {
      logger.error(`400 || ${'All input is required'} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(400).send({
        error: 'All input is required',
        missingFields: {
          email: !email ? 'Email is required' : '',
          password: !password ? 'Password is required' : '',
        },
      })
    }
    try {
      const registerResult = await this.userService.register(email, password)
      if (registerResult.hasOwnProperty('error')) {
        const error = registerResult as { error: string }
        logger.error(`401 || ${registerResult} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        return res.status(401).send(error.error)
      }
      return res.send(registerResult)
    } catch (e: any) {
      logger.error(`500 || ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(500).send(e.message)
    }
  }

  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!(email && password)) {
      logger.error(`400 || All input is required - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(400).send({
        error: 'All input is required',
        missingFields: {
          email: !email ? 'Email is required' : '',
          password: !password ? 'Password is required' : '',
        },
      })
    }
    try {
      const loginResult = await this.userService.login(email, password)
      if (loginResult.hasOwnProperty('error')) {
        const error = loginResult as { error: string }
        logger.error(`401 || ${error.error} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        return res.status(401).send(loginResult)
      }
      const user = loginResult as IUser
      logger.info(`Login success: ${user.email} - ${req.method} - ${req.ip}`)
      return res.send(loginResult)
    } catch (e: any) {
      logger.error(`500 || ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(500).send(e.message)
    }
  }
}
