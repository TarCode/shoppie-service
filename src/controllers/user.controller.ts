import { Request, Response, Router } from 'express'

import { UserService } from '../services/user.service'
import logger from '../middleware/logger'

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
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
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
        logger.error(`401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        return res.status(401).send(registerResult)
      }
      return res.send(registerResult)
    } catch (e: any) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(500).send(e.message)
    }
  }

  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!(email && password)) {
      logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
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
        logger.error(`401 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        return res.status(401).send(loginResult)
      }
      return res.send(loginResult)
    } catch (e: any) {
      logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
      return res.status(500).send(e.message)
    }
  }
}
