import { dbContext } from "../db/DbContext.js"


class AnimalsService {

  async getAnimals() {
    const animals = await dbContext.Animals.find()
    return animals
  }

  async updateAnimal(updateData, animalId) {
    // const update = await dbContext.Animals.findByIdAndUpdate(animalId, updateData, { new: true })
    const original = await dbContext.Animals.findById(animalId)
    if (!original) throw new Error("No animal with that ID")

    original.talent = updateData.talent ?? original.talent
    original.emoji = updateData.emoji ?? original.emoji

    await original.save()

    return original
  }
}

export const animalsService = new AnimalsService()
