import { response } from "express";
import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";




export class CatsController extends BaseController {
  constructor() {
    super('api/cats')
    this.router.get('', this.getCats)
    this.router.get('/test', this.test)
    this.router.post('', this.addCat)
    this.router.get('/:catId', this.getOneCat)
    this.router.delete('/:catId', this.adoptCat)

  }

  test(request, response, next) {
    console.log('Test Success')
    response.send("Test Success!")
  }

  async getCats(request, response, next) {
    try {
      const cats = await catsService.getCats()
      response.send(cats)
    } catch (error) {
      next(error)
    }
  }

  async getOneCat(request, response, next) {
    try {
      const catId = request.params.catId
      console.log('getting', catId);
      const cat = await catsService.getOneCat(catId)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async addCat(request, response, next) {
    try {
      // console.log('adding Cat', request.body);
      const catData = request.body
      const cat = await catsService.addCat(catData)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async adoptCat(request, response, next) {
    try {
      const catId = request.params.catId
      const message = await catsService.adoptCat(catId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
