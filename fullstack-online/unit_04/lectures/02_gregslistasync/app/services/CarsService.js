import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { Pop } from "../utils/Pop.js";
import { api } from "./AxiosService.js";



class CarsService {

  async getCars() {
    // const response = await fetch('https://sandbox.codeworksacademy.com/api/cars')
    // // console.log('🚗📡', response);
    // const data = await response.json()
    // // console.log('🚗📃', data);
    // const cars = data.map(carData => new Car(carData))

    // const response = await axios.get('https://sandbox.codeworksacademy.com/api/cars')

    const response = await api.get('api/cars')
    console.log('axios response', response.data);
    const cars = response.data.map(carData => new Car(carData))
    AppState.cars = cars
    console.log(cars);
  }

  async createCar(carData) {
    const response = await api.post('api/cars', carData)
    console.log('✨🚗📡', response.data);
    const car = new Car(response.data)
    AppState.cars.push(car)
  }

  async deleteCar(carId) {
    const response = await api.delete(`api/cars/${carId}`)
    console.log("🚮🚗📡", response.data);
    const carToRemove = AppState.cars.find(car => car.id == carId)
    const indexToRemove = AppState.cars.indexOf(carToRemove)
    AppState.cars.splice(indexToRemove, 1)
    Pop.toast(`${carToRemove.make} ${carToRemove.model} was deleted`, 'success')
  }
}


export const carsService = new CarsService()