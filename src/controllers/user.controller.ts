import { Request, Response, Router } from 'express'

import { UserService } from '../services/user.service'
import logger from '../logger'
import { IUser } from '../interfaces/user.interface'
import { MESSAGES } from '../constants/messages.constants'
import { NETWORK } from '../constants/network.constants'

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
      logger.error(
        `${NETWORK.badRequest.code} || ${MESSAGES.error.allInput} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      )
      return res.status(NETWORK.badRequest.code).send({
        error: MESSAGES.error.allInput,
        missingFields: {
          email: !email ? MESSAGES.error.email : '',
          password: !password ? MESSAGES.error.password : '',
        },
      })
    }
    try {
      const registerResult = await this.userService.register(email, password)
      if (registerResult.hasOwnProperty('error')) {
        const error = registerResult as { error: string }
        logger.error(
          `${NETWORK.unauthorized.code} || ${registerResult} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        )
        return res.status(NETWORK.unauthorized.code).send(error.error)
      }
      return res.send(registerResult)
    } catch (e: any) {
      logger.error(
        `${NETWORK.internalServerError.code} || ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      )
      return res.status(NETWORK.internalServerError.code).send(e.message)
    }
  }

  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!(email && password)) {
      logger.error(
        `${NETWORK.badRequest.code} || All input is required - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      )
      return res.status(NETWORK.badRequest.code).send({
        error: MESSAGES.error.allInput,
        missingFields: {
          email: !email ? MESSAGES.error.email : '',
          password: !password ? MESSAGES.error.password : '',
        },
      })
    }
    try {
      const loginResult = await this.userService.login(email, password)
      if (loginResult.hasOwnProperty('error')) {
        const error = loginResult as { error: string }
        logger.error(`${NETWORK.unauthorized.code} || ${error.error} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        return res.status(NETWORK.unauthorized.code).send(loginResult)
      }
      const user = loginResult as IUser
      logger.info(`Login success: ${user.email} - ${req.method} - ${req.ip}`)
      return res.send(loginResult)
    } catch (e: any) {
      logger.error(
        `${NETWORK.internalServerError.code} || ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      )
      return res.status(NETWORK.internalServerError.code).send(e.message)
    }
  }
}
