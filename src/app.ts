import { MONGO_URL } from './constants/shoppie.constants'
import { ListController } from './controllers/list.controller'
import { ItemController } from './controllers/item.controller'
import { UserController } from './controllers/user.controller'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { verifyToken } from './middleware/auth'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.setConfig()
    this.setMongoConfig()
    this.setControllers()
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    this.app.use(cors())
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_URL)
    // Renaming _id to id
    mongoose.set('toJSON', {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id
      },
    })
  }

  private setControllers() {
    const listController = new ListController()
    const itemController = new ItemController()
    const userController = new UserController()

    this.app.use('/user', userController.router)

    this.app.use(verifyToken as any as RequestHandler)
    this.app.use('/lists', listController.router)
    this.app.use('/items', itemController.router)
  }
}

export default new App().app
