import { Request, Response, Router } from 'express'

import { UserService } from '../services/user.service'

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
      res.status(400).send('All input is required')
    }
    try {
      const registerResult = await this.userService.register(email, password)
      res.send(registerResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('All input is required')
    }
    try {
      const loginResult = await this.userService.login(email, password)
      res.send(loginResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }
}
