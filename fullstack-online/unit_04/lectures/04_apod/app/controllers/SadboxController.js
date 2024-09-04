import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class SandboxController {
  constructor() {
    console.log('🥪🎮');
    // this.getMyAPODs()
    AppState.on('user', this.getMyAPODs)
    AppState.on('user', this.showFavoritesButton)
    AppState.on('myAPODs', this.drawMyAPODs)
  }


  async saveAPOD() {
    try {
      await sandboxService.saveAPOD()
    } catch (error) {
      Pop.toast("Could not save APOD")
      console.error(error);
    }
  }

  async getMyAPODs() {
    try {
      await sandboxService.getMyAPODs()
    } catch (error) {
      Pop.toast("Could get your APODs", 'error')
      console.error(error);
    }
  }

  drawMyAPODs() {
    const myAPODs = AppState.myAPODs
    let myAPODsHTML = ''
    myAPODs.forEach(apod => myAPODsHTML += apod.apodListTemplate)
    setHTML('my-apods', myAPODsHTML)
  }

  showFavoritesButton() {
    let buttonElm = document.getElementById('toggle-favorites-btn')
    buttonElm.classList.remove('d-none')
  }

  setActiveAPOD(apodId) {
    sandboxService.setActiveAPOD(apodId)
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance('#my-apods-offcanvas')
    offcanvas.hide()
    console.log(offcanvas);
  }

  async removeFavorite(apodId) {
    try {
      event.stopPropagation()
      const confirm = await Pop.confirm("are you sure you want to delete this apod?")
      if (!confirm) return

      console.log('deleting ', apodId);
      await sandboxService.removeFavorite(apodId)
    } catch (error) {
      Pop.toast("Could not delete Favorite APOD", 'error')
      console.error(error);
    }
  }
}