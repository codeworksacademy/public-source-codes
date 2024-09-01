import { AppState } from "../AppState.js"





export class Gachamon {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
    this.type = data.type
    this.rarity = data.rarity
  }

  get littleCard() {
    return /*html*/`
    <div onclick="app.GachamonsController.setActiveGachamon('${this.name}')" class="little-card ${this.type} " role="button">
    <div class="card-name fw-bold">${this.name}</div>
    <img src="${this.picture}"/>
    </div>
    `
  }

  get bigCard() {
    return /* html */`
<div class="big-card ${this.type} ${this.rarityStyle}">
  <h3 class="text-end card-name">${this.name}</h3>
  <img class="my-1" src="${this.picture}" alt="">
  <div class="d-flex justify-content-between">
    <span class="${this.type} px-2 rounded-pill text-light">${this.type}</span> <span class="px-2 rounded-pill bg-dark text-light">x${this.cardCount}</span>
  </div>
  <div class="text-center">${this.rarityStars}</div>
</div>
`
  }

  get rarityStars() {
    if (this.rarity == 'common') return '⭐'
    if (this.rarity == 'uncommon') return '⭐⭐'
    if (this.rarity == 'rare') return '⭐⭐⭐'
    if (this.rarity == 'ultra-rare') return '⭐⭐⭐⭐'
    if (this.rarity == 'secret-rare') return '⭐⭐⭐⭐⭐'
  }

  get rarityStyle() {
    if (this.rarity == 'rare') return 'glow'
    if (this.rarity == 'ultra-rare') return 'holographic'
    if (this.rarity == 'secret-rare') return 'negative glow holographic'
  }

  get cardCount() {
    const myGachamons = AppState.myGachamons
    let count = 0
    myGachamons.forEach(gachamon => {
      if (gachamon.name == this.name) count++
    })
    return count
  }
}