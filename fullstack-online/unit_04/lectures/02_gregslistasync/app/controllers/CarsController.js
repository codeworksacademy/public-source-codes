import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class CarsController {
  constructor() {
    console.log('🚗🎮');
    this.getCars()
    AppState.on('cars', this.drawCars)
    AppState.on('user', this.showCarForm)
    AppState.on('account', this.drawCars)
  }


  async getCars() {
    await carsService.getCars()
  }

  showCarForm() {
    const carFormElm = document.getElementById('car-form')
    carFormElm.classList.remove('d-none')
  }

  drawCars() {
    const cars = AppState.cars
    let carsContent = ''
    cars.forEach(car => carsContent += car.CardTemplate)
    setHTML('car-listings', carsContent)
  }

  async createCar() {
    try {
      event.preventDefault()
      const form = event.target
      const carData = getFormData(form)
      console.log('📃🚗', carData);
      await carsService.createCar(carData)
    } catch (error) {
      // console.log('SOMETHING BAD HAPPENED', error);
      // alert(error.message)
      Pop.toast(`Could not Post car. Status Code:${error.status}`, 'error')
      console.error(error)
    }
  }

  async deleteCar(carId) {
    try {
      const confirmed = await Pop.confirm("Are you sure you want to delete this car?")
      if (confirmed == false) return

      await carsService.deleteCar(carId)
    } catch (error) {
      Pop.toast("could not delete car", 'error')
      console.error(error);

    }
  }
}