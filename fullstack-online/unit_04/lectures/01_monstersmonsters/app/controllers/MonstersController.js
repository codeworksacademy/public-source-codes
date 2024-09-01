import { AppState } from "../AppState.js";
import { monstersService } from "../services/MonstersService.js";




export class MonstersController {
  constructor() {
    console.log('👺🎮');
    this.getMonsters()
    // this.drawMonsters()
    AppState.on('monsters', this.drawMonsters)
  }


  async getMonsters() {
    await monstersService.getMonsters()
  }

  drawMonsters() {
    console.log('✏️👺');
    const monsters = AppState.monsters
    let monstersContent = ''
    monsters.forEach(monster => monstersContent += monster.CardTemplate)
    let monstersElm = document.getElementById('monsters')
    monstersElm.innerHTML = monstersContent
  }

  filterMonsters(filterRegion) {
    console.log('🆒', filterRegion);
    monstersService.filterMonsters(filterRegion)
  }
}