import { AppState } from "../AppState.js";
import { Monster } from "../models/Monster.js";

const monstersApiURL = 'https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters'
class MonstersService {

  async getMonsters() {
    const response = await fetch(monstersApiURL)
    console.log(response);
    const monsterData = await response.json()
    console.log('👺📡', monsterData);
    const monsters = monsterData.data.map(monsterData => new Monster(monsterData))
    console.log('👺✨', monsters);
    AppState.monsters = monsters // what is displayed on the page
    AppState.masterListMonsters = monsters // this is a separate list to create filters from
  }

  filterMonsters(filterRegion) {
    let filtered = AppState.masterListMonsters.filter(monster => monster.locations.join('').includes(filterRegion))
    AppState.monsters = filtered
  }
}

export const monstersService = new MonstersService()