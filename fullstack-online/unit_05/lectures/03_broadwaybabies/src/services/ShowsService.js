import { dbContext } from "../db/DbContext.js"



class ShowsService {



  async getAllShows() {
    // const shows = await dbContext.Shows.find().populate('animal').populate('handler', 'name picture')
    const shows = await dbContext.Shows.find().populate('animal handler', '-email')
    return shows
  }
  async createShow(showData) {
    const show = await dbContext.Shows.create(showData)
    await show.populate('handler animal', '-email')
    return show
  }

  async getAnimalShows(animalId) {
    // ......................................{animalId: '6615c244f55b865da81a54a0'}
    const shows = await dbContext.Shows.find({ animalId: animalId }).populate('animal handler', '-email')
    return shows
  }

  async getMyShows(userId) {
    const shows = await dbContext.Shows.find({ handlerId: userId }).populate('animal handler', '-email')
    return shows
  }
}

export const showsService = new ShowsService()
