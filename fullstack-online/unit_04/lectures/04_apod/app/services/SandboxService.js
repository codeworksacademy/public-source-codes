import { AppState } from "../AppState.js"
import { Apod } from "../models/Apod.js";
import { api } from "./AxiosService.js"



class SandboxService {


  async getMyAPODs() {
    const response = await api.get('api/apods')
    console.log('🧑‍🚀🌃📡', response.data);
    const myAPODs = response.data.map(apodDate => new Apod(apodDate))
    AppState.myAPODs = myAPODs
  }

  async saveAPOD() {
    const apodToSave = AppState.apod
    const response = await api.post('api/apods', apodToSave)
    console.log('💾🌃📡', response.data);
    const savedAPod = new Apod(response.data)
    AppState.myAPODs.push(savedAPod)

  }

  setActiveAPOD(apodId) {
    const selectedAPOD = AppState.myAPODs.find(apod => apod.id == apodId)
    AppState.apod = selectedAPOD
  }

  async removeFavorite(apodId) {
    const response = await api.delete(`api/apods/${apodId}`)
    console.log('🔥🌃📡', response.data);
    const indexToRemove = AppState.myAPODs.findIndex(apod => apod.id == apodId)
    AppState.myAPODs.splice(indexToRemove, 1)
  }
}

export const sandboxService = new SandboxService()