import { animalsService } from "../services/AnimalsService.js";
import { showsService } from "../services/ShowsService.js";
import BaseController from "../utils/BaseController.js";


export class AnimalsController extends BaseController {
  constructor() {
    super('api/animals')
    this.router
      .get('', this.getAnimals)
      .put('/:animalId', this.updateAnimal)
      .get('/:animalId/shows', this.getAnimalShows)
  }

  async getAnimals(request, response, next) {
    try {
      const animals = await animalsService.getAnimals()
      response.send(animals)
    } catch (error) {
      next(error)
    }
  }

  async updateAnimal(request, response, next) {
    try {
      const animalId = request.params.animalId
      const updateData = request.body
      const update = await animalsService.updateAnimal(updateData, animalId)
      response.send(update)
    } catch (error) {
      next(error)
    }
  }

  async getAnimalShows(request, response, next) {
    try {
      const animalId = request.params.animalId
      const shows = await showsService.getAnimalShows(animalId)
      response.send(shows)
    } catch (error) {
      next(error)
    }
  }
}
