import { Car } from "@/models/Car.js";
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js";



class CarsService {
  async deleteCar(carId) {
    const response = await api.delete(`api/cars/${carId}`)
    console.log('🔥🚗📡', response.data);
    const indexToRemove = AppState.cars.findIndex(car => car.id == carId)
    AppState.cars.splice(indexToRemove, 1)
  }
  async createCar(carData) {
    const response = await api.post('api/cars', carData)
    console.log('✨🚗📡', response.data);
    const createdCar = new Car(response.data)
    AppState.cars.push(createdCar)
  }

  async getCars() {
    const response = await api.get('api/cars')
    console.log('🚗📡', response.data);
    const cars = response.data.map(carData => new Car(carData))
    AppState.cars = cars
  }

}

export const carsService = new CarsService()
