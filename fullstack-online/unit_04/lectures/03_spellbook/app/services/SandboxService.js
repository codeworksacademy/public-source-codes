import { AppState } from "../AppState.js"
import { FullSpell } from "../models/Spell.js";
import { Pop } from "../utils/Pop.js";
import { api } from "./AxiosService.js"




class SandboxService {



  setActiveSpell(spellId) {
    const spell = AppState.mySpells.find(spell => spell.id == spellId)
    AppState.activeSpell = spell
  }

  async saveActiveSpell() {
    const activeSpell = AppState.activeSpell
    const response = await api.post('api/spells', activeSpell)
    console.log('🥪📃📡', response.data);
    const spell = new FullSpell(response.data)
    AppState.mySpells.push(spell)
  }
  async getMySpells() {
    const response = await api.get('api/spells')
    console.log('🥪🧙‍♂️📡', response.data);
    const spells = response.data.map(spellData => new FullSpell(spellData))
    console.log(spells);
    AppState.mySpells = spells
  }

  async removeSpell(spellId) {
    const response = await api.delete(`api/spells/${spellId}`)
    console.log('💣📃📡', response.data);
    const spellToRemove = AppState.mySpells.find(spell => spell.id == spellId)
    const indexToRemove = AppState.mySpells.indexOf(spellToRemove)
    AppState.mySpells.splice(indexToRemove, 1)
    Pop.toast(`${spellToRemove.name} was removed`, 'success', 'top')
  }

  async prepareSpell(spellId) {
    const spellToPrepare = AppState.mySpells.find(spell => spell.id == spellId)

    // spellToPrepare.name = 'banana'
    spellToPrepare.prepared = !spellToPrepare.prepared

    const response = await api.put(`api/spells/${spellId}`, spellToPrepare)
    console.log('📑📡', response.data);
    AppState.emit('mySpells')

  }
}

export const sandboxService = new SandboxService()