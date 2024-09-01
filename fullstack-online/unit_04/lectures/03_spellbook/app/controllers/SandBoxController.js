import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";


export class SandboxController {
  constructor() {
    console.log('🥪🎮');
    // this.getMySpells()
    AppState.on('user', this.getMySpells)
    AppState.on('mySpells', this.drawMySpells)
  }


  async saveActiveSpell() {
    try {
      await sandboxService.saveActiveSpell()
    } catch (error) {
      Pop.toast("there was a problem, saving the spell")
      console.error(error)
    }
  }

  async getMySpells() {
    try {
      await sandboxService.getMySpells()
    } catch (error) {
      Pop.toast("there was a problem getting your spells")
      console.error(error)
    }
  }

  drawMySpells() {
    const spells = AppState.mySpells
    let myListContent = ''
    spells.forEach(spell => myListContent += spell.MyListTemplate)
    setHTML('my-spells', myListContent)

    const preparedSpells = spells.filter(spell => spell.prepared)
    console.log('📝', preparedSpells);
    setText('prepared-count', `${preparedSpells.length}/8`)

  }

  setActiveSpell(spellId) {
    sandboxService.setActiveSpell(spellId)
  }

  async removeSpell(spellId) {
    try {
      const confirm = await Pop.confirm("Are you sure?")
      if (confirm == false) return

      await sandboxService.removeSpell(spellId)
    } catch (error) {
      Pop.toast("Could not remove spell")
      console.error(error)
    }
  }

  async prepareSpell(spellId) {
    try {
      await sandboxService.prepareSpell(spellId)
    } catch (error) {
      Pop.toast("Could not prepare that spell")
      console.error(error)
    }
  }
}