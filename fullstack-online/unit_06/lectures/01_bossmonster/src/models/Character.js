


export class Character {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
    this.health = data.health
    this.maxHealth = data.health
    this.level = data.level ?? 1
    this.type = data.type
  }

  get healthPercent() {
    return Math.round((this.health / this.maxHealth) * 100)
  }
}
