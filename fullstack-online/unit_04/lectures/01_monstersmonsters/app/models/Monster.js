


export class Monster {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.image = data.image
    this.dlc = data.dlc
    this.description = data.description
    this.locations = data.common_locations || []
    this.drops = data.drops || []
  }

  get CardTemplate() {
    return /*html*/`
      <div class="monster-card">
        <div class="card bg-black">
          <img src="${this.image}" alt=""
            class="card-img">
          <div class="card-body">
            <h4 class="text-capitalize">${this.name}</h4>
            <hr />
            <div>${this.locationBubbles}</div>
            <p>${this.description}</p>
            <div>${this.dropBubbles}</div>
          </div>
        </div>
      </div>
    `
  }

  get locationBubbles() {
    let bubblesContent = ''
    this.locations.forEach(loc => bubblesContent += `<span class="me-1 px-2 bg-primary rounded-pill">${loc}</span>`)
    return bubblesContent
  }

  get dropBubbles() {
    let bubblesContent = ''
    this.drops.forEach(drop => bubblesContent += `<span class="d-inline-block text-warning mb-1 me-1 px-2 border border-warning rounded-pill">${drop}</span>`)
    return bubblesContent
  }
}