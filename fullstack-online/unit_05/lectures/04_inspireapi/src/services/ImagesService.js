import { dbContext } from "../db/DbContext.js"



class ImagesService {

  async getRandomImage() {
    const imageCount = await dbContext.Images.countDocuments()
    const randomNumber = Math.floor(Math.random() * imageCount)
    const image = await dbContext.Images.findOne().skip(randomNumber).populate('author', 'name picture')
    return image
  }
  async createImage(imageData) {
    const image = await dbContext.Images.create(imageData)
    await image.populate('author', 'name picture')
    return image
  }
}

export const imagesService = new ImagesService()
