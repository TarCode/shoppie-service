import { Request, Response, Router } from 'express'

import { ListService } from '../services/list.service'

export class ListController {
  public router = Router()
  private listService = new ListService()

  constructor() {
    this.setRoutes()
  }

  public setRoutes() {
    this.router.route('/').get(this.findAll).post(this.add)

    this.router.route('/:id').delete(this.delete).put(this.update)
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const lists = await this.listService.findAll()
      res.send(lists)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private add = async (req: Request, res: Response) => {
    try {
      const addListResult = await this.listService.add(req.body)
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
