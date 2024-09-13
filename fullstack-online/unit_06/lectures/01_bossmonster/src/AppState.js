import { reactive } from 'vue'
import { Character } from './models/Character.js'
import { Monster } from './models/Monster.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({


  /** @type {Character[]} */
  heroes: [
    new Character({
      name: 'Slate Slabrock',
      picture: 'https://em-content.zobj.net/source/microsoft-3D-fluent/406/man-genie_1f9de-200d-2642-fe0f.png',
      health: 50,
      type: 'Fighter🪨'
    }),
    new Character({
      name: 'Swift Ironstag',
      picture: 'https://em-content.zobj.net/source/microsoft-3D-fluent/406/woman-elf_1f9dd-200d-2640-fe0f.png',
      health: 25,
      type: 'Ranger✂️'
    }),
    new Character({
      name: 'Razzle Inkwell',
      picture: 'https://em-content.zobj.net/source/microsoft-3D-fluent/406/man-mage_1f9d9-200d-2642-fe0f.png',
      health: 25,
      type: 'Wizard📖'
    })
  ],

  monster: null,

  allMonsters: [
    new Monster({
      name: 'Animated Armor',
      picture: 'https://em-content.zobj.net/source/microsoft-teams/363/person-fencing_1f93a.png',
      health: 100,
      type: 'Ranger✂️',
      title: "he's pretty weak"
    }),
    new Monster({
      name: 'Vampire Lord',
      picture: 'https://em-content.zobj.net/source/microsoft/407/woman-vampire_1f9db-200d-2640-fe0f.png',
      health: 150,
      type: 'Ranger✂️',
      title: "Weak to sun"
    }),
    new Monster({
      name: 'Thud the troll',
      picture: 'https://em-content.zobj.net/source/google/404/troll_1f9cc.png',
      health: 200,
      type: 'Ranger✂️',
      title: "'thud'"
    }),
    new Monster({
      name: 'Thud the troll',
      picture: 'https://em-content.zobj.net/source/google/404/troll_1f9cc.png',
      health: 200,
      type: 'Ranger✂️',
      title: "'thud'"
    }),
    new Monster({
      name: 'Giant Crab',
      picture: 'https://em-content.zobj.net/source/twitter/348/crab_1f980.png',
      health: 125,
      type: 'Ranger✂️',
      title: "Attack his weak point!"
    }),
    new Monster({
      name: 'Bazoghast the Tainted',
      picture: 'https://em-content.zobj.net/source/twitter/348/orangutan_1f9a7.png',
      health: 500,
      type: 'Ranger✂️',
      title: "This guy is nasty"
    }),
  ],


  gold: 250,


  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null
})

