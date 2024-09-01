import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";




export class CarsController {
  constructor() {
    console.log('🚗🎮');
    this.drawCars()
    AppState.on('cars', this.drawCars)
    carsService.loadCars()
  }


  drawCars() {
    console.log('✏️🚗');
    const cars = AppState.cars
    let carsContent = ''
    cars.forEach(car => carsContent += car.CardTemplate)
    const listingElm = document.getElementById('listings')
    listingElm.innerHTML = carsContent
  }

  createCar() {
    console.log(event);
    event.preventDefault()
    // let carMake = event.target.make.value
    // console.log('make', carMake);
    /** @type {HTMLFormElement} */
    // @ts-ignore
    const form = event.target
    console.log(form.make.value);
    console.log(form);
    // const formData = new FormData(form)
    // console.log('data', formData);
    // formData.forEach((value, name) => console.log(value, name))
    const carData = getFormData(form)
    console.log('car data', carData);
    carsService.createCar(carData)
    form.reset()
    // this.drawCars() we don't need to invoke functions on our own anymore
  }

  deleteCar(carId) {
    const confirmed = confirm('are you sure you want to delete this car? this cannot be undone.')
    console.log('deleteing', confirmed, carId);
    if (confirmed == false) return

    carsService.deleteCar(carId)
  }
}