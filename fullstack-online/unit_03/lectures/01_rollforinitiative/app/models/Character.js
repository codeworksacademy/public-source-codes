



export class Character {
  constructor(name, picture, archetype, health) {
    this.name = name
    this.picture = picture
    this.archetype = archetype
    this.health = health
    this.maxHealth = health
  }

  greeting() {
    console.log(`hello my name is ${this.name}`);
  }

  characterCard() {
    return /* html */`
      <div class="col-md-4">
        <div class="card shadow">
          <img src="${this.picture}" alt="">
          <div class="card-body text-center">
            <h3 class="card-title">${this.name}</h3>
            <p>${this.archetype}</p>
            <div class="fw-bold text-${this.healthColor}">${this.health}/${this.maxHealth}</div>
            <button onclick="app.CharactersController.hurtCharacter('${this.name}')" class="btn btn-danger"><i class="mdi mdi-minus"></i></button>
            <button onclick="app.CharactersController.healCharacter('${this.name}')" class="btn btn-success"><i class="mdi mdi-plus"></i></button>
          </div>
        </div>
      </div>
    `
  }

  get healthColor() {
    if (this.health > this.maxHealth) return 'primary'

    if (this.health > this.maxHealth / 2) return 'success'

    if (this.health > 5) return 'warning'

    return 'danger'
  }
}

