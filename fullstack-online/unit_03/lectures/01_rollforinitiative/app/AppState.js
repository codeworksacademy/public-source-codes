import { Character } from './models/Character.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {



  clickCount = 0

  characters = [
    new Character('Mick', 'https://em-content.zobj.net/source/microsoft-teams/363/man-mage_1f9d9-200d-2642-fe0f.png', 'Wizard', 15),
    new Character('Jeremy', 'https://em-content.zobj.net/source/microsoft-teams/363/man-vampire_1f9db-200d-2642-fe0f.png', 'Vampire', 25),
    new Character('Jake', 'https://em-content.zobj.net/source/emojipedia/294/troll_1f9cc.png', 'CEO', 50),
    new Character('Guy', 'https://em-content.zobj.net/source/microsoft-teams/363/man-pouting_1f64e-200d-2642-fe0f.png', 'Normal', 5),
    new Character('Oslo', 'https://em-content.zobj.net/source/microsoft-teams/363/orangutan_1f9a7.png', 'Monk', 500)
  ]










}

export const AppState = createObservableProxy(new ObservableAppState())