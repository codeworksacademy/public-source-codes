import { AppState } from "../AppState.js"



export class Spell {
  constructor(data) {
    this.name = data.name
    this.index = data.index
    this.level = data.level
  }

  get ListTemplate() {
    return /*html*/`
    <div class="btn text-start" role="button" onclick="app.DndController.getActiveSpell('${this.index}')">${this.ActiveStar}${this.name}</div>
    `
  }

  get ActiveStar() {
    if (AppState.activeSpell && AppState.activeSpell.index == this.index) {
      return '<i class="mdi mdi-flare me-2 text-primary"></i>'
    }
    return ''
  }
}

export class FullSpell extends Spell {
  constructor(data) {
    super(data)
    this.description = data.description || data.desc.join("<br/><br/>")
    this.damage = this.formatDamage(data.damage)
    this.range = data.range

    this.material = data.material || '<i title="no material" class="mdi mdi-bag-personal-off"></i>'
    this.components = data.components

    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.castingTime || data.casting_time
    this.duration = data.duration

    // sandbox specific properties
    this.id = data.id
    this.prepared = data.prepared
    this.creatorId = data.creatorId
  }

  formatDamage(damageRaw) {
    if (!damageRaw) return `<i title="non damaging" class="mdi mdi-fire-off"></i>`
    if (damageRaw.damage_at_slot_level) {
      return `${damageRaw.damage_type.name} ${damageRaw.damage_at_slot_level[this.level]}`
    }
    if (damageRaw.damage_at_character_level) {
      return `${damageRaw.damage_type.name} ${damageRaw.damage_at_character_level[1]}`
    }
    return damageRaw
  }

  get MyListTemplate() {
    return /*html*/`
<section class="row align-items-center">
  <div class="col-1">
    <input type="checkbox" ${this.CheckedBox} onchange="app.SandboxController.prepareSpell('${this.id}')"/>
  </div>
  <div role="button" onclick="app.SandboxController.setActiveSpell('${this.id}')" class="col-9 btn text-start">
    ${this.name}
  </div>
  <button onclick="app.SandboxController.removeSpell('${this.id}')" title="remove ${this.name} from book"
    class="col-2 btn btn-outline-danger border-0"><i class="mdi mdi-delete-forever"></i></button>
</section>
`
  }

  get CheckedBox() {
    if (this.prepared) return 'checked'
    return ''
  }

  get activeTemplate() {
    return /*html*/`
    <section class="row sticky-top">
          <div class="col">
            <article class="card shadow-sm">
              <div class="card-header">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <h3>${this.name}</h3>
                    <span class="fw-bold text-secondary ms-2 fs-5">lvl ${this.level}</span>
                  </div>
                  <div>
                    <button
                    onclick="app.SandboxController.saveActiveSpell()"
                     class="btn btn-outline-primary">Add To Book <i class="mdi mdi-plus-thick"></i></button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="fw-bold d-flex flex-wrap">
                    <span>${this.damage}</span>
                    <i class="mdi mdi-circle-small"></i>
                    <span>${this.range}</span>
                    <i class="mdi mdi-circle-small"></i>
                    <span>${this.castingTime}</span>
                    <i class="mdi mdi-circle-small"></i>
                    <span>${this.duration}</span>
                  </div>
                  <div>
                    ${this.ConcentrationBubble}
                    ${this.RitualBubble}
                  </div>
                </div>
                <p class="px-1 mt-1">${this.description}</p>
                <hr />
                <div>

                </div>
                <div>
                 ${this.ComponentsBubbles}
                </div>
                <div>
                  <small>${this.material}</small>
                </div>
              </div>
            </article>
          </div>
        </section>
    `
  }

  get ConcentrationBubble() {
    if (this.concentration) return `
    <span title="requires concentration" class="bg-warning rounded-pill px-2 text-light">Concentration <i
    class="mdi mdi-head-snowflake"></i></span>`
    return `
    <span title="does not require concentration" class="border border-warning rounded-pill px-2 text-warning">Concentration <i
    class="mdi mdi-head-snowflake"></i></span>
    `
  }

  get RitualBubble() {
    if (this.ritual) return ` 
      <span title="Ritual cast" class="bg-info rounded-pill px-2 text-light">Ritual <i
      class="mdi mdi-star-crescent"></i></span>
    `
    return ` 
      <span title="Not ritual cast" class="border border-info rounded-pill px-2 text-info">Ritual <i
      class="mdi mdi-star-crescent"></i></span>
    `
  }

  get ComponentsBubbles() {
    let bubbles = ''
    this.components.forEach(comp => {
      if (comp == 'V') bubbles += '<span class="bg-primary me-1 rounded-pill px-2 text-light">Verbal</span>'
      if (comp == 'S') bubbles += `<span class="bg-primary me-1 rounded-pill px-2 text-light">Somatic</span>`
      if (comp == 'M') bubbles += `<span class="bg-primary me-1 rounded-pill px-2 text-light">Material</span>`
    })
    return bubbles
  }
}

/**!SECTION
name: String, required
description: String, required
damage: String, 
level: Number, 
range: String, required
material: String, 
ritual: Boolean, 
concentration: Boolean, 
castingTime: String, 
duration: String, required
components: undefined, 
prepared: Boolean, 
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database) */