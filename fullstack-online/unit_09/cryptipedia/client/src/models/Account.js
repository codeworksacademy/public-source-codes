export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.updatedAt = new Date(data.updatedAt)
    this.createdAt = new Date(data.createdAt)
  }
}

export class Account extends Profile {
  /**
   * @typedef AccountData
   * @property {string} id
   * @property {string} email
   * @property {string} name
   * @property {string} picture
   * 
   * @param {AccountData} data
   */
  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}

