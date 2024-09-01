import { dbContext } from "../db/DbContext.js"

// const FAKEDB = {
//   cats: [
//     {
//       name: 'Beans',
//       picture: '🐈‍⬛',
//       age: 9
//     },
//     {
//       name: 'Cheese',
//       picture: '🐈‍',
//       age: 12
//     },
//     {
//       name: 'Guac',
//       picture: '🐅',
//       age: 5
//     }
//   ]
// }

class CatsService {


  async getCats() {
    // const cats = FAKEDB.cats
    // return cats

    const cats = await dbContext.Cats.find()
    return cats

  }

  async getOneCat(catId) {
    // const cat = await dbContext.Cats.findOne({ name: 'Guac' })
    // const cat = await dbContext.Cats.findOne({ _id: catId })

    const cat = await dbContext.Cats.findById(catId)
    if (!cat) throw new Error(`There is no cat with that Id: ${catId}`)
    return cat
  }

  async addCat(catData) {
    // FAKEDB.cats.push(catData)
    // return catData

    const cat = await dbContext.Cats.create(catData)
    return cat
  }


  async adoptCat(catId) {
    // await dbContext.Cats.findByIdAndDelete(catId)
    const catToAdopt = await dbContext.Cats.findById(catId)
    if (!catToAdopt) {
      throw new Error("There is not cat there. Bad Id")
    }
    await catToAdopt.deleteOne()
    return `${catToAdopt.name} was adopted 😁 ${catToAdopt.picture}`
  }

}


export const catsService = new CatsService()
