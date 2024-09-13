import { Character } from "./Character.js";



export class Monster extends Character {
  constructor(data) {
    super(data)
    this.title = data.title
    this.goldDropped = data.goldDropped || 200
    this.types = data.types || ['Fighter🪨', 'Ranger✂️', 'Wizard📖']
  }


  get randomType() {
    return this.types[Math.floor(Math.random() * this.types.length)]
  }
}
