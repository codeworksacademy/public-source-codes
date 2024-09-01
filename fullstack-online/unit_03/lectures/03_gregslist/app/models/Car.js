import { generateId } from "../utils/GenerateId.js"


export class Car {
  /**
   * @param {{
   * make: string,
   * model: string,
   * year: number,
   * price: number,
   * imgUrl: string,
   * color: string,
   * listingDate: *
   * }} data 
   */
  constructor(data) {
    this.id = generateId()
    this.listingDate = data.listingDate ? new Date(data.listingDate) : new Date()
    this.make = data.make
    this.model = data.model
    this.year = data.year
    this.price = data.price
    this.imgUrl = data.imgUrl || 'https://images.unsplash.com/photo-1511377537649-c17e440ef4b2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG95JTIwY2FyfGVufDB8fDB8fHww'
    this.color = data.color
  }

  get CardTemplate() {
    return /*html*/ `
    
    <div class="car col-6 col-md-4 position-relative">
    <div class="card shadow">
      <div class="card-body p-1">
        <img
          src="${this.imgUrl}"
          alt="" class="card-img">
        <h5> ${this.make} ${this.model}</h5>
        <div>
        <span>${this.year} <i style="color: ${this.color}" class="mdi mdi-circle"></i></span>
        </div>
        <p class="text-end fw-bold text-success">$${this.price}</p>
        <small class="text-secondary">${this.dateFormatted}</small>
      </div>

    </div>
    <button onclick="app.CarsController.deleteCar('${this.id}')" class="delete-button btn btn-danger rounded position-absolute top-0 end-0"><i class="mdi mdi-delete-forever"></i></button>
  </div>
    `
  }

  get dateFormatted() {
    return this.listingDate.toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' })
  }
}