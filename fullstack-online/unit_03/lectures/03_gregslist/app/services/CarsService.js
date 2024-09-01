import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js"
import { Pop } from "../utils/Pop.js";



class CarsService {
  createCar(carData) {
    const car = new Car(carData)
    console.log('🚗✨', car);
    // AppState.cars.push(car) adds to the end
    AppState.cars.unshift(car) // adds to the start
    this.saveCars()
  }
  deleteCar(carId) {
    const carToDelete = AppState.cars.find(car => car.id == carId)
    const indexToRemove = AppState.cars.indexOf(carToDelete)
    // const indexToRemove = AppState.cars.findIndex(car => car.id == carId)
    console.log('🗑️', carToDelete, indexToRemove);
    AppState.cars.splice(indexToRemove, 1)
    Pop.toast(`Deleted ${carToDelete.make} ${carToDelete.model}`)
    this.saveCars()
  }


  saveCars() {
    const cars = AppState.cars
    const carsString = JSON.stringify(cars)
    console.log('🚗🧵', carsString);
    // console.log(cars.toString());
    // console.log(JSON.parse(carsString));
    localStorage.setItem('gregslist_cars', carsString)
  }

  loadCars() {
    const carsString = localStorage.getItem('gregslist_cars') // retrieve data from local
    console.log('💾🚗🧵', carsString);
    const carsData = JSON.parse(carsString) // convert data from string, to OBJ array
    console.log('🚗💾', carsData);
    if (carsData == null) return // if no data (first load) stop the loading process

    const cars = carsData.map(carData => new Car(carData)) // convert OBJ array into Car array
    console.log('🚗🚗', cars);
    AppState.cars = cars // load cars into appstate
  }

}

export const carsService = new CarsService()