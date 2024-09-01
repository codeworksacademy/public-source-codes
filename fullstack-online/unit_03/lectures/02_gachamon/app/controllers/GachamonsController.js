import { AppState } from "../AppState.js";
import { gachamonsService } from "../services/GachamonsService.js";




export class GachamonsController {
  constructor() {
    console.log('Gacha Gachamon!');
    this.drawGachamons()

    AppState.on('activeGachamon', () => console.log('❗active changed'))
    AppState.on('activeGachamon', this.drawActiveGachamon)
    AppState.on('myGachamons', this.drawMyGachamons)
  }

  drawGachamons() {
    const gachamons = AppState.gachamons
    let gochamonsContent = ''
    gachamons.forEach(gachamon => gochamonsContent += gachamon.littleCard)
    const cardListElm = document.getElementById('cards-list')
    cardListElm.innerHTML = gochamonsContent
  }

  drawActiveGachamon() {
    const activeGachamon = AppState.activeGachamon
    let activeContent = activeGachamon.bigCard
    const activeElm = document.getElementById('active-card')
    activeElm.innerHTML = activeContent
  }

  drawMyGachamons() {
    const myGachamons = AppState.myGachamons
    let myContent = ''
    myGachamons.forEach(gachamon => myContent += gachamon.littleCard)
    let myCardsElm = document.getElementById('my-cards')
    myCardsElm.innerHTML = myContent
  }

  setActiveGachamon(gachaName) {
    console.log('inspecting', gachaName);
    gachamonsService.setActiveGachamon(gachaName)
  }

  collectRandomGachamon() {
    console.log('🎲');
    gachamonsService.collectRandomGachamon()
  }


}