


export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.bio = data.bio
    this.linkedin = data.linkedin
    this.createdAt = new Date(data.createdAt)
  }

  get joinedDate() {
    return this.createdAt.toLocaleDateString('en-us', { day: '2-digit', month: 'long', year: 'numeric' })
  }
}
