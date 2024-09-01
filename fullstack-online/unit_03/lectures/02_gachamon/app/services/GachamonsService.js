import { AppState } from "../AppState.js";


class GachamonsService {
  setActiveGachamon(gachaName) {
    console.log('service', gachaName);
    const selectedGachamon = AppState.gachamons.find(gachamon => gachamon.name == gachaName)
    console.log('👆', selectedGachamon);
    AppState.activeGachamon = selectedGachamon
    console.log('AppState', AppState);
  }

  collectRandomGachamon() {
    const gachamons = AppState.gachamons
    const randomIndex = Math.floor(Math.random() * gachamons.length)
    const randomGachamon = gachamons[randomIndex]
    let chance = Math.random() * 100
    gachamons.forEach(gacha => {
      if (gacha.rarity == 'common') chance -= 10
      if (gacha.rarity == 'uncmmon') chance -= 15
    })


    console.log('🎲💽', randomGachamon);
    AppState.myGachamons.push(randomGachamon)
    AppState.activeGachamon = randomGachamon
    console.log('my', AppState.myGachamons);
  }
}

export const gachamonsService = new GachamonsService()