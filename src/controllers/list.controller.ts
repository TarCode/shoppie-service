import { Request, Response, Router } from 'express'
import { ListService } from '../services/list.service'
import { RequestUser } from '../types/express/'
export class ListController {
  public router = Router()
  private listService = new ListService()

  constructor() {
    this.setRoutes()
  }

  public setRoutes() {
    this.router.route('/').get(this.findAll).post(this.add)

    this.router.route('/:id').get(this.findOne).delete(this.delete).put(this.update)
  }

  private findAll = async (req: Request, res: Response) => {
    try {
      const reqUser = req as any as RequestUser
      const lists = await this.listService.findByUserId(reqUser.user.user_id)
      res.send(lists)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private findOne = async (req: Request, res: Response) => {
    try {
      const list = await this.listService.findById(req.params.id)
      res.send(list)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private add = async (req: Request, res: Response) => {
    try {
      const reqUser = req as any as RequestUser
      const addListResult = await this.listService.add({
        ...req.body,
        userId: reqUser.user.user_id,
      })
      res.send(addListResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private delete = async (req: Request, res: Response) => {
    try {
      const deleteListResult = await this.listService.delete(req.params.id)
      res.send(deleteListResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  // Our new update method
  private update = async (req: Request, res: Response) => {
    try {
      const updateListResult = await this.listService.update(req.params.id, req.body)
      res.send(updateListResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }
}
