import { AppState } from "../AppState.js";
import { dndService } from "../services/DndService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";




export class DndController {
  constructor() {
    console.log('🐉🎮');
    this.getSpells()
    AppState.on('dndSpells', this.drawSpellList)
    AppState.on('activeSpell', this.drawActiveSpell)
    AppState.on('activeSpell', this.drawSpellList)
  }


  async getSpells() {
    try {
      await dndService.getSpells()
    } catch (error) {
      Pop.toast("Could not get Spells", 'error')
      console.error(error)
    }
  }

  async getActiveSpell(spellIndex) {
    try {
      await dndService.getActiveSpell(spellIndex)
    } catch (error) {
      Pop.toast("Could not get Active Spell", 'error')
      console.error(error)
    }
  }

  drawSpellList() {
    const spells = AppState.dndSpells
    let listContent = ''
    spells.forEach(spell => listContent += spell.ListTemplate)
    setHTML('dnd-list', listContent)
  }

  drawActiveSpell() {
    const activeSpell = AppState.activeSpell
    let activeContent = activeSpell.activeTemplate
    setHTML('active-spell', activeContent)
  }
}