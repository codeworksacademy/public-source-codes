
const USD = new Intl.NumberFormat('en-US')

export class Car {
  constructor(data) {
    this.id = data.id
    this.make = data.make
    this.model = data.model
    this.description = data.description
    this.engineType = data.engineType
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.color = data.color
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get priceFormat() {
    return USD.format(this.price)
  }
}
