import { Request, Response, Router } from 'express'

import { ItemService } from '../services/item.service'

export class ItemController {
  public router = Router()
  private itemService = new ItemService()

  constructor() {
    this.setRoutes()
  }

  public setRoutes() {
    this.router.route('/').get(this.findAll).post(this.add)

    this.router.route('/list/:id').get(this.findByListId)

    this.router.route('/:id').delete(this.delete).put(this.update)
  }

  private findAll = async (_: Request, res: Response) => {
    try {
      const items = await this.itemService.findAll()
      res.send(items)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private findByListId = async (req: Request, res: Response) => {
    try {
      const items = await this.itemService.findByListId(req.params.listId)
      res.send(items)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private add = async (req: Request, res: Response) => {
    try {
      const addItemResult = await this.itemService.add(req.body)
      res.send(addItemResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  private delete = async (req: Request, res: Response) => {
    try {
      const deleteItemResult = await this.itemService.delete(req.params.id)
      res.send(deleteItemResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }

  // Our new update method
  private update = async (req: Request, res: Response) => {
    try {
      const updateItemResult = await this.itemService.update(req.params.id, req.body)
      res.send(updateItemResult)
    } catch (e: any) {
      res.status(500).send(e.message)
    }
  }
}
