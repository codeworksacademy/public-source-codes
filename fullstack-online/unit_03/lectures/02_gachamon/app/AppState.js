import { Gachamon } from './models/Gachamon.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {



  gachamons = [
    new Gachamon({
      name: 'Oslo',
      picture: 'https://em-content.zobj.net/source/apple/391/orangutan_1f9a7.png',
      type: 'intellectual',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Justin',
      picture: 'https://em-content.zobj.net/source/apple/391/pig_1f416.png',
      type: 'intellectual',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Ricky',
      picture: 'https://em-content.zobj.net/source/apple/391/snail_1f40c.png',
      type: 'biter',
      rarity: 'common'
    }),
    new Gachamon({
      name: 'Jessica',
      picture: 'https://em-content.zobj.net/source/apple/391/badger_1f9a1.png',
      type: 'biter',
      rarity: 'uncommon'
    }),
    new Gachamon({
      name: 'Xanther',
      picture: 'https://em-content.zobj.net/source/apple/391/shark_1f988.png',
      type: 'biter',
      rarity: 'uncommon'
    }),
    new Gachamon({
      name: 'Jung',
      picture: 'https://em-content.zobj.net/source/apple/391/zebra_1f993.png',
      type: 'grazer',
      rarity: 'rare'
    }),
    new Gachamon({
      name: 'Momma',
      picture: 'https://em-content.zobj.net/source/apple/391/squid_1f991.png',
      type: 'intellectual',
      rarity: 'rare'
    }),
    new Gachamon({
      name: 'Herbert',
      picture: 'https://em-content.zobj.net/source/apple/391/gorilla_1f98d.png',
      type: 'grazer',
      rarity: 'rare'
    }),
    new Gachamon({
      name: 'Rhonda',
      picture: 'https://em-content.zobj.net/source/apple/391/rhinoceros_1f98f.png',
      type: 'stomper',
      rarity: 'rare'
    }),
    new Gachamon({
      name: 'Hammond',
      picture: 'https://em-content.zobj.net/source/apple/391/mammoth_1f9a3.png',
      type: 'stomper',
      rarity: 'ultra-rare'
    }),
    new Gachamon({
      name: 'Nega Oslo',
      picture: 'https://em-content.zobj.net/source/apple/391/orangutan_1f9a7.png',
      type: 'celestial',
      rarity: 'secret-rare'
    }),
  ]

  /** @type {Gachamon} */
  activeGachamon = null

  /** @type {Gachamon[]} */
  myGachamons = []



  /**@type {import('./models/Example.js').Example[]} */
  examples = []
}

export const AppState = createObservableProxy(new ObservableAppState())

console.log('AppState', AppState);
