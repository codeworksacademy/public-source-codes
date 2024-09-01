import { FullSpell, Spell } from './models/Spell.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  /** @type {Spell[]} */
  dndSpells = []

  /** @type {FullSpell[]} */
  mySpells = []


  /** @type {FullSpell} */
  activeSpell = null



  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
}

export const AppState = createObservableProxy(new ObservableAppState())