import { AppState } from "../AppState.js";
import { nasaService } from "../services/NasaService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class NasaController {
  constructor() {
    console.log('🚀🎮');
    this.getAPOD()
    AppState.on('apod', this.drawApod)
    AppState.on('user', this.drawApod)
    AppState.on('myAPODs', this.drawApod)
  }


  async getAPOD() {
    try {
      await nasaService.getAPOD()
    } catch (error) {
      Pop.toast("Could not get APOD", 'error')
      console.error(error);
    }
  }

  async getAPODByDate() {
    try {
      const input = document.getElementById('apod-date')
      console.log('getting by 📅', input);
      const inputDate = input.value
      console.log('👆📅', inputDate);
      await nasaService.getAPODByDate(inputDate)
    } catch (error) {
      Pop.toast("Could not get APOD", 'error')
      console.error(error);
    }
  }

  drawApod() {
    const apod = AppState.apod
    let apodHTML = apod.apodTemplate
    setHTML('apod', apodHTML)
    document.body.style.backgroundImage = `url(${apod.imgUrl})`
  }
}