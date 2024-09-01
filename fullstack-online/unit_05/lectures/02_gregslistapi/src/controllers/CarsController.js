import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";



export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router.get('/', this.getCars)
  }

  async getCars(request, response, next) {
    try {
      const query = request.query
      console.log('??', query);
      const cars = await carsService.getCars(query)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }
}
