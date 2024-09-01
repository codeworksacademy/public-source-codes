import { AppState } from "../AppState.js";
import { FullSpell, Spell } from "../models/Spell.js";

// @ts-ignore
const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/'
})


class DndService {
  async getSpells() {
    const response = await dndApi.get('spells')
    console.log('🐉📡', response.data);
    const spells = response.data.results.map(spellData => new Spell(spellData))
    AppState.dndSpells = spells
  }
  async getActiveSpell(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)
    console.log('👆🐉📡', response.data);
    const spell = new FullSpell(response.data)
    AppState.activeSpell = spell
  }

}

export const dndService = new DndService()