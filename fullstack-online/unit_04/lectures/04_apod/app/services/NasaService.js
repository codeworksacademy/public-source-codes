import { AppState } from "../AppState.js";
import { nasaAPIKey } from "../env.js";
import { Apod } from "../models/Apod.js";


const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/planetary/'
})

class NasaService {
  async getAPODByDate(inputDate) {
    const response = await nasaApi.get(`apod?api_key=${nasaAPIKey}&date=${inputDate}`)
    console.log('👆🌃📡', response.data);
    const apod = new Apod(response.data)
    AppState.apod = apod
  }

  async getAPOD() {
    const response = await nasaApi.get(`apod?api_key=${nasaAPIKey}`)
    console.log('🌃📡', response.data);
    const apod = new Apod(response.data)
    AppState.apod = apod
  }

}

export const nasaService = new NasaService()