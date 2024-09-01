import { AppState } from "../AppState.js"




export class Car {
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description || ''
    this.color = data.color
    this.engineType = data.engineType
    // ------ lets talk about this later
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = data.updatedAT
  }

  get CardTemplate() {
    return /*html*/`
    <div class="car col-6 col-md-4 position-relative">
    <div class="card shadow">
      <div class="card-body p-1">
        <img
          src="${this.imgUrl}"
          alt="" class="card-img">
        <h5> ${this.make} ${this.model}</h5>
        <div class="d-flex justify-content-between">
        <span><i class="mdi mdi-engine"></i> ${this.engineType} </span><span>${this.year} <i style="color: ${this.color}" class="mdi mdi-circle"></i></span>
        </div>
        <p class="px-3 py-1">${this.description}</p>
        <div class="text-end fw-bold text-success mb-0">$${this.price}</div>
        <div class="d-flex justify-content-between">
          <small class="text-secondary">${this.createdAtFormatted}</small>
          <div>${this.creator.name} <img class="creator-img" src="${this.creator.picture}"/></div>
        </div>
      </div>
    ${this.deleteButton}
    </div>
   
  </div>
    `
  }

  get createdAtFormatted() {
    return this.createdAt.toLocaleDateString('en-us', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  get deleteButton() {
    const account = AppState.account
    if (account && account.id == this.creatorId) {
      return /*html*/` 
      <button onclick="app.CarsController.deleteCar('${this.id}')" class="delete-button btn btn-danger rounded position-absolute top-0 end-0"><i class="mdi mdi-delete-forever"></i></button>`
    } else {
      return ''
    }
  }
}


/**
make: String, required
model: String, required
imgUrl: String, required
year: Number, required
price: Number, required
description: String, 
color: String, 
engineType: String, 
creatorId: SchemaObjectId, required
*creator: Object (Virtual Added by Database)
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
 */